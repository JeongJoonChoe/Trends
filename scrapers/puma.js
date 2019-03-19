const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Product = require('../database/productModel.js')

const URLS = {
  popMenShoes: 'https://us.puma.com/en/us/mens/shoes/lifestyle#srule=top-sellers&pagesize=36',
  popWomenShoes: 'https://us.puma.com/en/us/womens/shoes/lifestyle#srule=top-sellers&pagesize=36',
  popMenShirts: 'https://us.puma.com/en/us/mens/clothing/t-shirts#srule=top-sellers&pagesize=36',
  popWomenShirts: 'https://us.puma.com/en/us/womens/clothing/t-shirts#srule=top-sellers&pagesize=36',
  newMenShoes: 'https://us.puma.com/en/us/mens/shoes/lifestyle#srule=newest&pagesize=36',
  newWomenShoes: 'https://us.puma.com/en/us/womens/shoes/lifestyle#srule=newest&pagesize=36',
  newMenShirts: 'https://us.puma.com/en/us/mens/clothing/t-shirts#srule=newest&pagesize=36',
  newWomenShirts: 'https://us.puma.com/en/us/womens/clothing/t-shirts#srule=newest&pagesize=36'
}

async function pumaScraper(url, type) {
  const browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 2000, height: 2000});
  await page.waitFor(5000);

  const html = await page.content();
  const $ = cheerio.load(html);

  let data = [];
  let prices = $('.value');

  prices.each(function(i, el) {
    if ($('.tile-image')[i]){
      data.push({
        brand: 'puma',
        title: $('.tile-image')[i].attribs.alt,
        image: $('.tile-image')[i].attribs.src,
        price: $(this).text(),
        type: type
      })
    }
  })
  await browser.close();
  Product.insertMany(data);
  console.log(data);
};

(async () => {
  for (let key in URLS) {
    await pumaScraper(URLS[key], key);
  }
})();