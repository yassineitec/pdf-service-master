const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

const routes = require('./routes');

app.use('/pdf', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});