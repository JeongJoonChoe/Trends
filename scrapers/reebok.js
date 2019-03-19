const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Product = require('../database/productModel.js')

const URLS = {
  popMenShoes: 'https://www.reebok.com/us/men-classic-shoes?srule=top-sellers',
  popWomenShoes: 'https://www.reebok.com/us/women-lifestyle?srule=top-sellers',
  popMenShirts: 'https://www.reebok.com/us/men-t_shirts%7Clong_sleeve_tops?srule=top-sellers',
  popWomenShirts: 'https://www.reebok.com/us/women-t_shirts%7Clong_sleeve_tops?srule=top-sellers',
  newMenShoes: 'https://www.reebok.com/us/men-classic-shoes?srule=newest-to-oldest',
  newWomenShoes: 'https://www.reebok.com/us/women-lifestyle?srule=top-sellers',
  newMenShirts: 'https://www.reebok.com/us/men-t_shirts%7Clong_sleeve_tops?srule=newest-to-oldest',
  newWomenShirts: 'https://www.reebok.com/us/women-t_shirts%7Clong_sleeve_tops?srule=newest-to-oldest'
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
  browser.close();
  Product.insertMany(data);
  console.log(data);
};

(async () => {
  for (let key in URLS) {
    await reebokScraper(URLS[key], key);
  }
})();