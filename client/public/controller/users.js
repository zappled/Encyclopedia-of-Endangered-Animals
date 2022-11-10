const Pool = require("pg").Pool;
const pool = new Pool({
  user: "gx",
  host: "localhost",
  database: "endangered_animals",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT name, country FROM user_accounts", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = { getUsers };
