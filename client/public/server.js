require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const animalsDB = require("./controller/animals");
const usersDB = require("./controller/users");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/search/users", usersDB.getUsers);

app.get("/search/animals", animalsDB.getAllAnimals);

app.get("/search/animals/:id", animalsDB.getAnimalByID);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
