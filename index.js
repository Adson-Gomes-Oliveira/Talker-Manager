const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const error = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());
app.use('/talker', router.talkerRouter);
app.use('/login', router.loginRouter);
app.use(error.errorMiddleware);

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
