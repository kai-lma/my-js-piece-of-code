const $ = require('cheerio');
const axios = require('axios');

const NUMBER_OF_ARTICLE = 2;

const omoplataUrl = 'https://www.omoplata.net/geinin/%E3%83%A1%E3%82%A4%E3%83%97%E3%83%AB%E8%B6%85%E5%90%88%E9%87%91';

const urlSelector = element => $('.article-thumb > a', element).attr('href');
const dateSelector = element => $('.date', element).text().match(/\d{4}\.\d{2}\.\d{2}/)[0];
const imageSelector = element => $('img', element).attr('src');
const titleSelector = element => $('h3', element).text();

const dataSelector = html => $('div.article', html)
  .slice(0, NUMBER_OF_ARTICLE)
  .map((_, element) => ({
    url: urlSelector(element),
    date: dateSelector(element),
    image: imageSelector(element),
    title: titleSelector(element),
  }))
  .toArray();

(async function main() {
  try {
    const data = await axios.get(omoplataUrl).then(res => dataSelector(res.data));
    console.log(data);
  } catch(e) {
    console.log(e);
  }
})();
