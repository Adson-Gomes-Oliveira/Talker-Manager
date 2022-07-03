const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQUEST_STATUS = 400;

const generateToken = () => {
  const randomString = Math.random().toString(36);
  const randomGenerated = randomString + randomString;
  const token = randomGenerated.substring(randomGenerated.length - 16);

  return token;
};

const registerUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'Invalid Request!' });
  }

  const tokenJSON = {
    token: generateToken(),
  };

  res.status(HTTP_OK_STATUS).json(tokenJSON);
};

module.exports = {
  registerUser,
};
