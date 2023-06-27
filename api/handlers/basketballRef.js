const fetch = require('node-fetch');
const jsdom = require('jsdom');
const processErrorResponse = require('../utils/processErrorResponse.js');

const getPlayersByName = async (req, res) => {
  const { name } = req.params
  console.log("You've hit /api/players with name: ", name)

  if (!name) {
    res.status(204)
  }

  try {
    const response = await fetch(`https://www.basketball-reference.com/search/search.fcgi?search=${encodeURIComponent(name)}`);
    const html = await response.text() 
    const dom = new jsdom.JSDOM(`${html}`);
    const document = dom.window.document;
    const playerLinks = Array.from(document.querySelectorAll(".search-item-name a")).map((linkEl) => (linkEl.getAttribute("href")));
    
    res.status(200).json(playerLinks)

  } catch (err) {
    let errMessage = `${err}`;
    processErrorResponse(res, 500, errMessage);    
  }
}

// v2 incorporates optional chaining (?.) to safely access properties on objects that may or may not be `undefined`, for example:
// const season = row.querySelector('th[data-stat="season"] a')?.textContent || '';
// This will prevent the errors but will still fail to retrieve the data, is my guess.
// I was wrong. This works because, in part, optional chaining allows us to table rows for which the querySelectors used might not be found, preventing the the forEach for breaking when an HTML element is not found and simply moving on to the next.

const getPlayerData = async (req, res) => { 
  let { playerlink } = req.query;
  console.log(playerlink)
  console.log("\x1b[45m", "YOOOO!! You've hit /api/player with link: ", playerlink);

  if (!playerlink) {
    res.statusCode = 204;
    return res.end('playerlink parameter is required');
  }

  try {
    if (playerlink[0] !== "/") {
      playerlink = `/${playerlink}`;
    }

    const playerUrl = `https://www.basketball-reference.com${playerlink}`;
    const bballRefResponse = await fetch(playerUrl);

    if (!bballRefResponse.ok) {
      res.statusCode = 404;
      return res.end(`No BBall-Ref data found for ${playerUrl}`);
    }

    const page = await bballRefResponse.text();
    const { document } = new jsdom.JSDOM(page).window;

    // Retrieve all player data
    const playerData = {};

    // Get player name
    playerData.name = document.querySelector('h1').textContent;

    // Get player stats
    const statsTable = document.querySelector('#per_game tbody');
    const stats = [];

    if (statsTable) {
      const rows = Array.from(statsTable.querySelectorAll('tr'));

      rows.forEach((row) => {
        const season = row.querySelector('th[data-stat="season"] a')?.textContent || '';
        const team = row.querySelector('td[data-stat="team_id"] a')?.textContent || '';
        const gamesPlayed = row.querySelector('td[data-stat="g"]')?.textContent || '';
        const pointsPerGame = row.querySelector('td[data-stat="pts_per_g"]')?.textContent || '';

        stats.push({ season, team, gamesPlayed, pointsPerGame });
      });
    }

    playerData.stats = stats;

    // Get jersey numbers
    const jerseyNumbers = [];
    const jerseyNumberLinks = document.querySelectorAll('.uni_holder.bbr a');

    jerseyNumberLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const match = href.match(/number=(\d+)/);
      if (match) {
        const jerseyNumber = match[1];
        const teamAndYears = link.getAttribute('data-tip');

        jerseyNumbers.push({ jerseyNumber, teamAndYears });
      }
    });

    playerData.jerseyNumbers = jerseyNumbers;

    res.status(200).json(playerData);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving player data');
  }
}

module.exports = {
  getPlayersByName,
  getPlayerData
};
