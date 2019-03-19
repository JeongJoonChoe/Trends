const rp = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const Product = require('../database/productModel.js');


const URLS = {
  popMenShoes: 'https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3?sortOrder=overallrating|desc',
  popWomenShoes: 'https://store.nike.com/us/en_us/pw/womens-shoes/7ptZoi3?sortOrder=overallrating|desc',
  popMenShirts: 'https://store.nike.com/us/en_us/pw/mens-tops-t-shirts/7puZobp?sortOrder=overallrating|desc',
  popWomenShirts: 'https://store.nike.com/us/en_us/pw/womens-tops-t-shirts/7ptZobp?sortOrder=overallrating|desc',
  newMenShoes: 'https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3?sortOrder=publishdate|desc',
  newWomenShoes: 'https://store.nike.com/us/en_us/pw/womens-shoes/7ptZoi3?sortOrder=publishdate|desc',
  newMenShirts: 'https://store.nike.com/us/en_us/pw/mens-tops-t-shirts/7puZobp?sortOrder=publishdate|desc',
  newWomenShirts: 'https://store.nike.com/us/en_us/pw/womens-tops-t-shirts/7ptZobp?sortOrder=publishdate|desc'
}

//puma
//sketchers
//underarmour
//newbalance
//asics



function nikeScraper(url, type) {

  let options = {
    uri: url,
    headers: {
      'user-agent': 'node.js'
    }
  }

  rp(options)
    .then((html) => {
      // console.log(html);
      const $ = cheerio.load(html);
      let data = [];

      $('.product-display-name').each(function(i, elem) {
        data.push({
          brand: 'Nike',
          title: $(this).text(),
          image: $('.grid-item-image-wrapper a img')[i].attribs.src,
          type: type
        })
      })

      $('.prices .local').each(function(i, elem) {
        if (i < data.length){
          data[i].price = $(this).text();
        }
      })
      console.log(data);
      Product.insertMany(data);

    })
    .catch((err) => {
      console.log('ERROR', err);
    })
}

for (let key in URLS) {
  nikeScraper(URLS[key], key);
}
