const Product = require('./productModel.js');

function findMenShoes(req, res) {
  let query = req.query.data === 'popular' ? 'popMenShoes': 'newMenShoes';

  Product.find({type: query}, function(err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(data);
    }
  })
}

function findWomenShoes(req, res) {
  let query = req.query.data === 'popular' ? 'popWomenShoes': 'newWomenShoes';

  Product.find({type: query}, function(err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(data);
    }
  })
}

function findMenShirts(req, res) {
  let query = req.query.data === 'popular' ? 'popMenShirts': 'newMenShirts';

  Product.find({type: query}, function(err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(data);
    }
  })
}

function findWomenShirts(req, res) {
  let query = req.query.data === 'popular' ? 'popWomenShirts': 'newWomenShirts';

  Product.find({type: query}, function(err, data) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(data);
    }
  })
}

module.exports = {
  findMenShoes,
  findWomenShoes,
  findMenShirts,
  findWomenShirts
}