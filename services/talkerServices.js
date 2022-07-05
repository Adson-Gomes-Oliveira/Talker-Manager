const fileHandle = require('../utils/fileHandle');

const HTTP_OK_STATUS = 200;
const DATABASE_JSON_FILE = './talker.json';

const getAll = async (_req, res) => {
  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  res.status(HTTP_OK_STATUS).json(database);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  const findUserById = database.find((user) => user.id === Number(id));

  if (!findUserById) return next({ message: 'Pessoa palestrante não encontrada', status: 404 });

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

const editPerson = async (req, res, next) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  const findByTalkerID = database.findIndex((talker) => talker.id === Number(id));
  if (findByTalkerID === -1) {
    return next({ message: 'Pessoa palestrante não encontrada', status: 404 });
  }

  database[findByTalkerID] = {
    ...database[findByTalkerID],
    name,
    age,
    talk,
  };

  await fileHandle.writeFile(DATABASE_JSON_FILE, JSON.stringify(database));
  res.status(HTTP_OK_STATUS).json(database[findByTalkerID]);
};

const deletePerson = async (req, res, next) => {
  const { id } = req.params;

  const database = await fileHandle.readFile(DATABASE_JSON_FILE);
  const findByTalkerID = database.findIndex((talker) => talker.id === Number(id));
  if (findByTalkerID === -1) {
    return next({ message: 'Pessoa palestrante não encontrada', status: 404 });
  }

  database.splice(findByTalkerID, 1);

  await fileHandle.writeFile(DATABASE_JSON_FILE, JSON.stringify(database));
  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  addPerson,
  editPerson,
  deletePerson,
};