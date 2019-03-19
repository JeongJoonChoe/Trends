const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Product = require('../database/productModel.js');

const URLS = {
  popMenShoes: 'https://www.adidas.com/us/men-originals-shoes?sort=top-sellers',
  popWomenShoes: 'https://www.adidas.com/us/women-originals-shoes?sort=top-sellers',
  popMenShirts: 'https://www.adidas.com/us/men-short_sleeve_shirts?sort=top-sellers',
  popWomenShirts: 'https://www.adidas.com/us/women-short_sleeve_shirts%7Ct_shirts?sort=top-sellers',
  newMenShoes: 'https://www.adidas.com/us/men-originals-shoes?sort=newest-to-oldest',
  newWomenShoes: 'https://www.adidas.com/us/women-originals-shoes?sort=newest-to-oldest',
  newMenShirts: 'https://www.adidas.com/us/men-short_sleeve_shirts?sort=newest-to-oldest',
  newWomenShirts: 'https://www.adidas.com/us/women-short_sleeve_shirts%7Ct_shirts?sort=newest-to-oldest'
}


async function adidasScraper(url, type) {
  const browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 2000, height: 2000});
  await page.waitFor(5000);

  const html = await page.content();
  const $ = cheerio.load(html);

  let data = [];
  let prices = $('.gl-price__value');

  prices.each(function(i, el) {
    data.push({
      brand: 'adidas',
      title: $('.gl-product-card__media a img')[i].attribs.alt,
      image: $('.gl-product-card__media a img')[i].attribs.src,
      price: $(this).text(),
      type: type
    })
  })
  Product.insertMany(data);

  console.log(data);
}

for (let key in URLS) {
  adidasScraper(URLS[key], key);
}
