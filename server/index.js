const express = require('express');
const cors = require('cors');
const { findMenShoes,
  findWomenShoes,
  findMenShirts,
  findWomenShirts} = require('../database/controllers.js');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

app.get('/mens/shoes', findMenShoes);

app.get('/mens/shirts', findMenShirts);

app.get('/womens/shoes',findWomenShoes );

app.get('/womens/shirts', findWomenShirts);

app.listen(port, () => {
  console.log(`listeining on port ${port}`);
});
