const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Product = require('../database/productModel.js')

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

async function reebokScraper(url, type) {
  const browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  await page.setViewport({width: 2000, height: 2000});
  await page.waitFor(5000);

  const html = await page.content();
  const $ = cheerio.load(html);

  let data = [];
  let prices = $('.salesprice');

  prices.each(function(i, el) {
    if ($('.image a img')[i]){
      data.push({
        brand: 'Reebok',
        title: $('.image a img')[i].attribs.alt,
        image: $('.image a img')[i].attribs.src,
        price: $(this).text().trim(),
        type: type
      })
    }
  })
  Product.insertMany(data);
  console.log(data);
};

for (let key in URLS) {
  reebokScraper(URLS[key], key);
}