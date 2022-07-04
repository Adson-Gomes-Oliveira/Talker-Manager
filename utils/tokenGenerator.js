const generateToken = () => {
  const randomString = Math.random().toString(36);
  const randomGenerated = randomString + randomString;
  const token = randomGenerated.substring(randomGenerated.length - 16);

  return {
    token,
  };
};

module.exports = {
  generateToken,
};
