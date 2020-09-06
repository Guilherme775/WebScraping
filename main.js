const axios = require("axios");
const cheerio = require("cheerio");

const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const main = async () => {
  const content = await fetchData(
    "https://myanimelist.net/topanime.php#:~:text=%20%20%20Rank%20%20%20Title%20,%20%20%20%204%20more%20rows%20"
  );
  const $ = cheerio.load(content);
  let animes = [];

  $("tr.ranking-list").each((index, e) => {
    const title = $(e)
      .find(".di-ib.clearfix > a.hoverinfo_trigger.fl-l.fs14.fw-b")
      .text();

    const rating = $(e)
      .find(".js-top-ranking-score-col.di-ib.al > span")
      .text();

    const data = { title, rating };

    animes.push(data);
  });

  console.log(animes);
};

main();
