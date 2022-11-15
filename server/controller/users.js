const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  user: "gx",
  host: "localhost",
  database: "endangered_animals",
  password: "password",
  port: 5432,
});

const createUser = async (req, res) => {
  const { name, email, password, country } = req.body;
  body("password").isLength({ min: 5 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await pool.query(
    "SELECT * FROM user_accounts WHERE user_accounts.name = $1",
    [name]
  );

  if (user.rows.length > 0) {
    return res.status(401).json("Username already exists");
  }

  const userEmail = await pool.query(
    "SELECT * FROM user_accounts WHERE user_accounts.email = $1",
    [email]
  );

  if (userEmail.rows.length > 0) {
    return res.status(401).json("Email has already been registered");
  }

  const hash = await bcrypt.hash(password, 12);

  pool.query(
    "INSERT INTO user_accounts (name, email, password, country) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hash, country],
    (error, results) => {
      if (error) {
        throw error;
      }
      res
        .status(201)
        .send(`User '${results.rows[0].name}' successfully created`);
    }
  );
};

const getUsers = (req, res) => {
  pool.query(
    "SELECT user_accounts.name, user_accounts.country, ARRAY_AGG(animals.name) AS spotlight, ARRAY_AGG(animals.id) AS spotlight_id FROM user_accounts LEFT JOIN users_favourites ON user_accounts.uuid = users_favourites.user_id LEFT JOIN animals ON users_favourites.animals_id = animals.id GROUP BY user_accounts.name, user_accounts.country ORDER by LOWER(user_accounts.name) ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getUserById = (req, res) => {
  const { id } = req.body;
  pool.query(
    `SELECT user_accounts.name, user_accounts.country, ARRAY_AGG(animals.name) AS spotlight FROM user_accounts LEFT JOIN users_favourites ON user_accounts.uuid = users_favourites.user_id LEFT JOIN animals ON users_favourites.animals_id = animals.id WHERE uuid=$1 GROUP BY user_accounts.name, user_accounts.country ORDER by LOWER(user_accounts.name) ASC`,
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const deleteUser = (req, res) => {
  const { uuid } = req.body;

  pool.query(
    "DELETE FROM user_accounts WHERE uuid = $1",
    [uuid],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(`User deleted with UUID: ${uuid}`);
    }
  );
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM user_accounts WHERE user_accounts.name = $1",
      [name]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Username does not exist");
    }

    const result = await bcrypt.compare(password, user.rows[0].password);

    if (!result) {
      console.log("username or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const payload = {
      id: user.uuid,
      username: user.name,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    const response = {
      id: user.rows[0].uuid,
      username: user.rows[0].name,
      isAdmin: user.rows[0].is_admin,
      access,
      refresh,
    };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", message: "login failed" });
  }
};

const changePassword = async (req, res) => {
  const { uuid, currentPassword, newPassword } = req.body;
  const newHash = await bcrypt.hash(newPassword, 12);
  try {
    const user = await pool.query(
      "SELECT password FROM user_accounts WHERE user_accounts.uuid = $1",
      [uuid]
    );
    bcrypt.compare(
      currentPassword,
      user.rows[0].password,
      function (err, result) {
        if (err) {
          console.log(err.message);
          return;
        }
        if (result) {
          pool.query("UPDATE user_accounts SET password=$1 WHERE uuid=$2", [
            newHash,
            uuid,
          ]);
          res.status(200).send({ message: "Password has been changed" });
        } else {
          return res.send({
            message: "Passwords do not match",
          });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

const changeEmail = async (req, res) => {
  const { uuid, email } = req.body;
  try {
    const existingEmail = await pool.query(
      "SELECT name FROM user_accounts WHERE user_accounts.email = $1",
      [email]
    );
    if (existingEmail.rows.length > 0) {
      return res.status(401).json("Email has already been registered");
    } else {
      pool.query("UPDATE user_accounts SET email=$1 WHERE uuid=$2", [
        email,
        uuid,
      ]);
      res.status(200).send({ message: "Email has been changed" });
    }
  } catch (err) {
    console.error(err.message);
  }
};

const toggleAdminStatus = async (req, res) => {
  const { uuid, isAdmin } = req.body;
  let adminStatus = "";
  if (isAdmin) {
    adminStatus = false;
  } else {
    adminStatus = true;
  }
  try {
    pool.query("SELECT * FROM user_accounts WHERE user_accounts.uuid = $1", [
      uuid,
    ]);
    pool.query("UPDATE user_accounts SET is_admin=$1 WHERE uuid=$2", [
      adminStatus,
      uuid,
    ]);
    res.status(200).send("Admin status has been updated");
  } catch (err) {
    console.error(err.message);
  }
};

const addToSpotlight = async (req, res) => {
  const { uuid, animalId } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM users_favourites WHERE users_favourites.user_id = $1",
      [uuid]
    );
    if (user.rows.length > 0) {
      for (let i = 0; i < user.rows.length; i++) {
        if (user.rows[i].animals_id === parseInt(animalId)) {
          pool.query(
            `DELETE FROM users_favourites WHERE user_id='${uuid}' AND animals_id=${animalId}`
          );
          return res.status(200).json("Animal removed from spotlight");
        }
        pool.query(
          `INSERT INTO users_favourites(user_id, animals_id) VALUES ('${uuid}', ${animalId})`
        );
      }
      res.status(200).json("Animal added to spotlight");
    } else {
      pool.query(
        `INSERT INTO users_favourites(user_id, animals_id) VALUES ('${uuid}', ${animalId})`
      );
      res.status(200).json("Animal added to spotlight");
    }
  } catch (err) {
    console.error(err.message);
  }
};

const removeFromSpotlight = async (req, res) => {
  const { uuid, animalId } = req.body;
  try {
    pool.query(
      `DELETE FROM users_favourites WHERE user_id='${uuid}' AND animals_id=${animalId}`
    );
    return res.status(200).json("Animal removed from spotlight");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  loginUser,
  changePassword,
  changeEmail,
  toggleAdminStatus,
  getUserById,
  addToSpotlight,
  removeFromSpotlight,
};
