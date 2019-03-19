const express = require('express');
const cors = require('cors');
const db = require('../database/index.js');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.listen(port, () => {
  console.log(`listeining on port ${port}`);
});
