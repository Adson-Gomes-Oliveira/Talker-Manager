const tokenGenerator = require('../utils/tokenGenerator');

const HTTP_OK_STATUS = 200;

const login = (_req, res) => {
  const token = tokenGenerator.generateToken();
  res.status(HTTP_OK_STATUS).json(token);
};

module.exports = {
  login,
};
