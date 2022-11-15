require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const animalsDB = require("./controller/animals");
const usersDB = require("./controller/users");
const { validatePut } = require("./validation/auth");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/search/users", usersDB.getUsers);

app.post("/search/users/id", usersDB.getUserById);

app.put("/users", validatePut, usersDB.createUser);

app.delete("/users/delete", usersDB.deleteUser);

app.get("/search/animals", animalsDB.getAllAnimals);

app.get("/search/animals/:id", animalsDB.getAnimalByID);

app.post("/search/animals/name", animalsDB.getAnimalIdByName);

app.delete("/search/animals", animalsDB.deleteAnimal);

app.post("/login", usersDB.loginUser);

app.patch("/users/password", usersDB.changePassword);

app.patch("/users/email", usersDB.changeEmail);

app.patch("/users/status", usersDB.toggleAdminStatus);

app.patch("/users/spotlight", usersDB.addToSpotlight);

app.delete("/users/spotlight", usersDB.removeFromSpotlight);

app.patch("/update/animal", animalsDB.updateAnimal);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
