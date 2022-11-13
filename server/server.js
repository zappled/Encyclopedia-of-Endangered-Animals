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

app.post("/search/users/id", usersDB.getUserById);

app.put("/users", usersDB.createUser);

app.delete("/users/delete", usersDB.deleteUser);

app.get("/search/animals", animalsDB.getAllAnimals);

app.get("/search/animals/:id", animalsDB.getAnimalByID);

app.delete("/search/animals", animalsDB.deleteAnimal);

app.post("/login", usersDB.loginUser);

app.patch("/users/password", usersDB.changePassword);

app.patch("/users/email", usersDB.changeEmail);

app.patch("/users/status", usersDB.toggleAdminStatus);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
