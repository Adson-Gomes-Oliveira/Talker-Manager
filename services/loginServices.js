const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;
const MIN_PASSWORD_CHARACTERS = 6;

const generateToken = () => {
  const randomString = Math.random().toString(36);
  const randomGenerated = randomString + randomString;
  const token = randomGenerated.substring(randomGenerated.length - 16);

  return {
    token,
  };
};

const validateLogin = (email, password) => {
  const verifyRegex = /\S+@\S+\.\S+/;
  const isEmailValid = verifyRegex.test(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_CHARACTERS;

  return {
    isEmailValid,
    isPasswordValid,
  };
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo email é obrigatório' });
  }
  if (!password) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo password é obrigatório' });
  }

  const validation = validateLogin(email, password);
  if (!validation.isEmailValid) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O email deve ter o formato email@email.com' });
  }
  if (!validation.isPasswordValid) {
    return res.status(HTTP_BAD_REQUEST_STATUS)
    .json({ message: 'O password deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json(generateToken());
};

module.exports = {
  login,
};
