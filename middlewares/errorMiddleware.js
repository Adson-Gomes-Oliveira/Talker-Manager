const errorMiddleware = (err, _req, res, _next) => {
  if (err.code) {
    return res.status(err.status).json({ error: err.message, code: err.code });
  }

  res.status(err.status).json({ message: err.message });
};

module.exports = {
  errorMiddleware,
};
