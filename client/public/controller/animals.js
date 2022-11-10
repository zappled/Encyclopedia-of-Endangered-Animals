const Pool = require("pg").Pool;
const pool = new Pool({
  user: "gx",
  host: "localhost",
  database: "endangered_animals",
  password: "password",
  port: 5432,
});

const getAllAnimals = (req, res) => {
  pool.query(
    "SELECT animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class, ARRAY_AGG(threats.name) AS threats, ARRAY_AGG(habitats.name) AS habitats FROM animals JOIN animals_threats ON animals.id = animals_threats.animals_id JOIN threats on animals_threats.threats_id = threats.id JOIN animals_habitats ON animals.id = animals_habitats.animals_id JOIN habitats on animals_habitats.habitats_id = habitats.id     GROUP BY animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class     ORDER BY animals.id ASC",
    // -- WHERE animals.id = 1
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getAnimalByID = (req, res) => {
  const { id } = req.body;

  pool.query(
    `SELECT animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class, ARRAY_AGG(threats.name) AS threats, ARRAY_AGG(habitats.name) AS habitats FROM animals JOIN animals_threats ON animals.id = animals_threats.animals_id JOIN threats on animals_threats.threats_id = threats.id JOIN animals_habitats ON animals.id = animals_habitats.animals_id JOIN habitats on animals_habitats.habitats_id = habitats.id  WHERE animals.id=${id}   GROUP BY animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class     ORDER BY animals.id ASC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const deleteAnimal = (req, res) => {
  const { id } = req.body;

  pool.query("DELETE FROM animals WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Animal deleted with ID: ${id}`);
  });
};

module.exports = { getAllAnimals, getAnimalByID, deleteAnimal };
