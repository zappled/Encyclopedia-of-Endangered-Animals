const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const pool = new Pool({
  user: "gx",
  host: "localhost",
  database: "endangered_animals",
  password: "password",
  port: 5432,
});

const createUser = async (req, res) => {
  // const user = await user_accounts.findOne({ username: req.body.username });
  // if (user) {
  //   return res
  //     .status(400)
  //     .json({ status: "error", message: "duplicate username" });
  // }
  const { name, email, password, country } = req.body;

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
  pool.query("SELECT name, country FROM user_accounts", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
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
      res.status(200).send(`User deleted with UUID: ${uuid}`);
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
    console.log(response);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ status: "error", message: "login failed" });
  }
};

module.exports = { getUsers, createUser, deleteUser, loginUser };
