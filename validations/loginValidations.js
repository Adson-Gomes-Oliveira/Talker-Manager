const MIN_PASSWORD_CHARACTERS = 6;

const validateLogin = (res, email, password) => {
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
};

const validateDataLogin = (res, email, password) => {
  const verifyRegex = /\S+@\S+\.\S+/;
  const isEmailValid = verifyRegex.test(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_CHARACTERS;

  if (!isEmailValid) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!isPasswordValid) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = {
  validateLogin,
  validateDataLogin,
};
