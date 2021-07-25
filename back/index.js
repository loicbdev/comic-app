const express = require('express');
const cors = require('cors');
require('express');
require('dotenv').config();
const showsRoute = require('./routes/shows.router.js');
const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/shows', showsRoute);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});