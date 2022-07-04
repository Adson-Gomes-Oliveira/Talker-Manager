const fileHandle = require('../utils/fileHandle');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const DATABASE_JSON_FILE = './talker.json';

const getAll = async (_req, res) => {
  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  res.status(HTTP_OK_STATUS).json(database);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  const findUserById = database.find((user) => user.id === Number(id));

  if (!findUserById) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(findUserById);
};

const addPerson = async (req, res) => {
  const { name, age, talk } = req.body;

  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  const newID = database.length + 1;

  const newPerson = [
    ...database,
    {
      name,
      age,
      id: newID,
      talk,
    },
  ];

  await fileHandle.writeFile(DATABASE_JSON_FILE, JSON.stringify(newPerson));

  res.status(201).json(newPerson[newPerson.length - 1]);
};

module.exports = {
  getAll,
  getById,
  addPerson,
};