const read = require('../utils/readfile');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const DATABASE_JSON_FILE = './talker.json';

const verifyNameAge = ({ name, age, _talk, res }) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (!name.length >= 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!age >= 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

// const verifyTalk = ({ talk, res }) => {
//   const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
//   if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
//   if (!talk.watchedAt) {
//     return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
//   }
//   if (!dateRegex.test(dateRegex)) {
//     return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }
//   if (!talk.rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
// };

const getAll = async (_req, res) => {
  const database = await read.readFile(DATABASE_JSON_FILE);
  res.status(HTTP_OK_STATUS).json(database);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const database = await read.readFile(DATABASE_JSON_FILE);

  const findUserById = database.find((user) => user.id === Number(id));

  if (!findUserById) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(HTTP_OK_STATUS).json(findUserById);
};

const addPerson = async (req, res) => {
  const { name, age, talk } = req.body;
  // const { token } = req.headers.authorization;

  verifyNameAge({ name, age, talk, res });

  const newPerson = {
    name,
    age,
    talk,
  };
  res.status(HTTP_OK_STATUS).json(newPerson);
};

module.exports = {
  getAll,
  getById,
  addPerson,
};