const Pool = require("pg").Pool;
const pool = new Pool({
  user: "gx",
  host: "localhost",
  database: "endangered_animals",
  password: "password",
  port: 5432,
});

// gets data of all animals in database

const getAllAnimals = (req, res) => {
  pool.query(
    "SELECT animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class, ARRAY_AGG(threats.name) AS threats, ARRAY_AGG(habitats.name) AS habitats FROM animals JOIN animals_threats ON animals.id = animals_threats.animals_id JOIN threats on animals_threats.threats_id = threats.id JOIN animals_habitats ON animals.id = animals_habitats.animals_id JOIN habitats on animals_habitats.habitats_id = habitats.id     GROUP BY animals.id, animals.name, animals.conservation_status, animals.region, animals.population, animals.image, animals.class     ORDER BY animals.id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// gets data of one animal based on animal ID

const getAnimalByID = (req, res) => {
  const { id } = req.params;
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

// gets data of one animal based on animal name

const getAnimalIdByName = (req, res) => {
  const { name } = req.body;
  pool.query(
    `SELECT animals.id FROM animals WHERE animals.name='${name}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// deletes one animal entry, based on animal ID

const deleteAnimal = async (req, res) => {
  const { id } = req.body;

  await pool.query(
    `
    DELETE FROM animals_habitats WHERE animals_id = $1;`,
    [id]
  );
  await pool.query(`DELETE FROM animals_threats WHERE animals_id = $1;`, [id]);
  await pool.query(`DELETE FROM animals WHERE id = $1;`, [id]);
  res.json("Entry deleted");
};

// updates entry details of one animal, based on animal ID

const updateAnimal = async (req, res) => {
  const {
    name,
    conservation_status,
    animalClass,
    region,
    population,
    image,
    id,
  } = req.body;
  try {
    await pool.query(
      "UPDATE animals SET name=$1, conservation_status=$2, class=$3, region=$4, population=$5, image=$6 WHERE animals.id = $7",
      [name, conservation_status, animalClass, region, population, image, id]
    );
    res.json("Entry updated");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllAnimals,
  getAnimalByID,
  deleteAnimal,
  getAnimalIdByName,
  updateAnimal,
};
