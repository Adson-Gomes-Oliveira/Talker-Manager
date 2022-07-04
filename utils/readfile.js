const fs = require('fs').promises;

const readFile = async (fileToRead) => {
  try {
    const database = await fs.readFile(fileToRead, 'utf-8')
    .then((result) => JSON.parse(result));
  
    return database;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  readFile,
};
