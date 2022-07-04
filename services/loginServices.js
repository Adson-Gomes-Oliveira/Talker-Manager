const validations = require('../validations/loginValidations');
const tokenGenerator = require('../utils/tokenGenerator');

const HTTP_OK_STATUS = 200;

const login = (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator.generateToken();

  validations.validateLogin(res, email, password);
  validations.validateDataLogin(res, email, password);

  res.status(HTTP_OK_STATUS).json(token);
};

module.exports = {
  login,
};
