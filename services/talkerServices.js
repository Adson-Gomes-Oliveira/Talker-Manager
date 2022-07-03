const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const readDatabase = async () => {
  try {
    const database = await fs.readFile('./talker.json', 'utf-8')
    .then((result) => JSON.parse(result));
  
    return database;
  } catch (err) {
    console.log(err.message);
  }
};

const getAll = async (_req, res) => {
  const database = await readDatabase();
  res.status(HTTP_OK_STATUS).json(database);
};

module.exports = {
  getAll,
};
