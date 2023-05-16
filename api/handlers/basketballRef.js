const fetch = require('node-fetch');
const jsdom = require('jsdom');
const processErrorResponse = require('../utils/processErrorResponse.js');

const getPlayersByName = async (req, res) => {
  const { name } = req.params
  console.log("You've hit /api/players with name: ", name)
  try {
    const response = await fetch(`https://www.basketball-reference.com/search/search.fcgi?search=${encodeURIComponent(name)}`);
    const html = await response.text() 
    const dom = new jsdom.JSDOM(`${html}`);
    const document = dom.window.document;

    const playerLinks = Array.from(document.querySelectorAll(".search-item-name a")).map((linkEl) => (linkEl.getAttribute("href")));
    playerLinks.forEach(playerLink => console.log(playerLink))
    res.status(200).json(playerLinks)
  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage);    
  }
}

const getPlayerData = async (req, res) => {
  let { playerlink } = req.query;
  console.log("\x1b[45m", "YOOOO!! You've hit /api/player with link: ", playerlink)

  if (!playerlink) {
    res.statusCode = 400;
    return res.end('playerlink parameter is required');
  }

  try {
    
    if (playerlink[0] !== "/") {
      playerlink = `/${playerlink}`
    }

    const playerUrl = `https://www.basketball-reference.com/${playerlink}`;
    const bballRefResponse = await fetch(playerUrl);
    
    if (!bballRefResponse.ok) {
      res.statusCode = 404;
      return res.end(`No BBall-Ref data found for ${playerUrl}`);
    }
     
    const page = await bballRefResponse.text()
    const { document } = (new jsdom.JSDOM(page)).window
    // Retrieve all player data
    const playerData = {};

    // Get player name
    playerData.name = document.querySelector('h1').textContent

    // // Get player stats
    const statsTable = document.querySelector('#per_game tbody');
    const rows = statsTable.querySelectorAll('tr:not(.thead)');
    const stats = [];
    rows.forEach((row) => {
      const season = row.querySelector('th[data-stat="season"]').textContent;
      const team = row.querySelector('td[data-stat="team_id"]').textContent;
      const gamesPlayed = row.querySelector('td[data-stat="g"]').textContent;
      const pointsPerGame = row.querySelector('td[data-stat="pts_per_g"]').textContent;
      
      stats.push({ season, team, gamesPlayed, pointsPerGame });
    });
    playerData.stats = stats;

    res.status(200).json(playerData);
    // res.status(200).json({});
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving player data');
  }
}

module.exports = {
  getPlayersByName,
  getPlayerData
};
