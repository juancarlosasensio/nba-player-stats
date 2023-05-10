const fetch = require('node-fetch');
const jsdom = require('jsdom');
const processErrorResponse = require('../utils/processErrorResponse.js');

const getPlayersByName = async (req, res) => {
  const { name } = req.params
  console.log("You've hit /api/players with name: ", name)
  try {
    const response = await fetch(`https://www.basketball-reference.com/search/search.fcgi?search=${encodeURIComponent(name)}`);
    const html = await response.text()
    
    const dom = new jsdom.JSDOM(`${html}`)

    const playerLinks = Array.from(dom.window.document.querySelectorAll(".search-item-name a")).map((linkEl) => (linkEl.getAttribute("href")));
    playerLinks.forEach(playerLink => console.log(playerLink))
    res.status(200).json(playerLinks)
    // const playerResponse = await fetch(`https://www.basketball-reference.com${playerLink}`);
    // const playerHtml = await playerResponse.text();
    // const playerParser = new DOMParser();
    // const playerDoc = playerParser.parseFromString(playerHtml, "text/html");

    // const playerStats = playerDoc.querySelector("#all_per_game");
    // const playerStatsRows = playerStats.querySelectorAll("tbody tr");

    // const data = [];



  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage);
    
  }
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(html, "text/html");


  // try { 
  //   const URL = `https://hn.algolia.com/api/v1/search?query=${name}`;
  //   const response = await fetch(URL, {
  //     host: 'hn.algolia.com',
  //     port: process.env.PORT || 8081,
  //     path: `/api/v1/search?query=${name}`,
  //     method : 'GET'
  //   });
  //   const data = await response.json();
  //   const articles = data.hits;

  //   const filteredArticles = articles.filter(filterEmptyURL);
  //   filteredArticles.sort(sortByDate)

  //   res.status(200).json(filteredArticles);

  // } catch (err) {
  //   let errMessage = `${err}`;
  //   processErrorResponse(res, 500, errMessage); 
  // }
}

module.exports = {
  getPlayersByName
};