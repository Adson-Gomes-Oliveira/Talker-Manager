const MIN_PASSWORD_CHARACTERS = 6;

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;

  const verifyRegex = /\S+@\S+\.\S+/;
  const isEmailValid = verifyRegex.test(email);

  if (!email) return next({ message: 'O campo "email" é obrigatório', status: 400 });
  if (!isEmailValid) {
    return next({ message: 'O "email" deve ter o formato "email@email.com"', status: 400 });
  }
  if (!password) return next({ message: 'O campo "password" é obrigatório', status: 400 });
  if (password.length < MIN_PASSWORD_CHARACTERS) {
    return next({ message: 'O "password" deve ter pelo menos 6 caracteres', status: 400 });
  }

  next();
};

module.exports = {
  validateLogin,
};
