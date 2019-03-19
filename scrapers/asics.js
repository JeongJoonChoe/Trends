const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Product = require('../database/productModel.js');

const URLS = {
  popMenShoes: 'https://www.asics.com/us/en-us/mens-shoes/c/mens-shoes',
  popWomenShoes: 'https://www.asics.com/us/en-us/womens-shoes/c/womens-shoes',
  popMenShirts: 'https://www.asics.com/us/en-us/mens-clothing/c/mens-clothing',
  popWomenShirts: 'https://www.asics.com/us/en-us/womens-clothing/c/womens-clothing',
  newMenShoes: 'https://www.asics.com/us/en-us/mens-shoes/c/mens-shoes?sort=newest',
  newWomenShoes: 'https://www.asics.com/us/en-us/womens-shoes/c/womens-shoes?sort=newest',
  newMenShirts: 'https://www.asics.com/us/en-us/mens-clothing/c/mens-clothing?sort=newest',
  newWomenShirts: 'https://www.asics.com/us/en-us/womens-clothing/c/womens-clothing?sort=newest'
}


async function asicsScraper(url, type) {
  const browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 2000, height: 2000});
  await page.waitFor(5000);
  const html = await page.content();
  const $ = cheerio.load(html);

  let data = [];
  let prices = $('.price');

  prices.each(function(i, el) {
    if ($('.primary-image')[i]){
      data.push({
        brand: 'asics',
        title: $('.primary-image')[i].attribs.alt,
        image: $('.primary-image')[i].attribs.src,
        price: $(this).text(),
        type: type
      })
    }
  })
  await page.close();

  Product.insertMany(data);

  console.log(data);
};

(async () => {
  for (let key in URLS) {
    await asicsScraper(URLS[key], key);
  }
})();
