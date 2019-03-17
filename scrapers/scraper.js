const rp = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const adidasURL = 'https://www.adidas.com/us/men-originals-shoes?sort=top-sellers';

// Most popular
const nikeMenShoes = 'https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3?sortOrder=overallrating|desc';
const nikeWomenShoes = 'https://store.nike.com/us/en_us/pw/womens-shoes/7ptZoi3?sortOrder=overallrating|desc';
const nikeMenShirts = 'https://store.nike.com/us/en_us/pw/mens-tops-t-shirts/7puZobp?sortOrder=overallrating|desc';
const nikeWomenShirts = 'https://store.nike.com/us/en_us/pw/womens-tops-t-shirts/7ptZobp?sortOrder=overallrating|desc';

//New Releases
const menShoe = 'https://store.nike.com/us/en_us/pw/mens-shoes/7puZoi3?sortOrder=publishdate|desc';
const womenShoes = 'https://store.nike.com/us/en_us/pw/womens-shoes/7ptZoi3?sortOrder=publishdate|desc';
const menShirts = 'https://store.nike.com/us/en_us/pw/mens-tops-t-shirts/7puZobp?sortOrder=publishdate|desc';
const womenShirts = 'https://store.nike.com/us/en_us/pw/womens-tops-t-shirts/7ptZobp?sortOrder=publishdate|desc';



//fila
//puma
//sketchers
//underarmour
//newbalance
//asics


function nikeScraper(url) {

  let options = {
    uri: nikeMenShirts,
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
          image: $('.grid-item-image-wrapper a img')[i].attribs.src
        })
      })

      $('.prices .local').each(function(i, elem) {
        if (i < data.length){
          data[i].price = $(this).text();
        }
      })
    })
    .catch((err) => {
      console.log('ERROR', err);
    })
}
