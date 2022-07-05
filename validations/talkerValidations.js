const verifyNewPersonData = (req, _res, next) => {
  const { name, age } = req.body;

  if (!name) return next({ message: 'O campo "name" é obrigatório', status: 400 });
  if (name.length < 3) {
    return next({ message: 'O "name" deve ter pelo menos 3 caracteres', status: 400 });
  }
  if (!Number.isInteger(age)) {
    return next({ message: 'O campo "age" é obrigatório', status: 400 });
  }
  if (age < 18) {
    return next({ message: 'A pessoa palestrante deve ser maior de idade', status: 400 });
  }

  next();
};

const verifyWatchedTalk = (req, _res, next) => {
  const { talk } = req.body;

  const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!talk) return next({ message: 'O campo "talk" é obrigatório', status: 400 });
  if (!talk.watchedAt) {
    return next({ message: 'O campo "watchedAt" é obrigatório', status: 400 });
  }
  if (!dateRegex.test(talk.watchedAt)) {
    return next({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', status: 400 });
  }

  next();
};

const verifyRateTalk = (req, _res, next) => {
  const { talk } = req.body;

  if (talk.rate === undefined) {
    return next({ message: 'O campo "rate" é obrigatório', status: 400 });
  }
  if (!Number.isInteger(talk.rate)) {
    return next({ message: 'O campo "rate" deve ser um inteiro de 1 à 5', status: 400 });
  }
  if (talk.rate > 5 || talk.rate < 1) {
    return next({ message: 'O campo "rate" deve ser um inteiro de 1 à 5', status: 400 });
  }

  next();
};

const verifyToken = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ message: 'Token não encontrado', status: 401 });
  if (token.length < 16 || token.length > 16) {
    return next({ message: 'Token inválido', status: 401 });
  }

  next();
};

module.exports = {
  verifyNewPersonData,
  verifyWatchedTalk,
  verifyRateTalk,
  verifyToken,
};
