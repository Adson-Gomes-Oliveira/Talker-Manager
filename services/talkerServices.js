const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

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

const getById = async (req, res) => {
  const { id } = req.params;
  const database = await readDatabase();

  const findUserById = database.find((user) => user.id === Number(id));

  if (!findUserById) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(findUserById);
};

module.exports = {
  getAll,
  getById,
};