const { Router } = require('express');
const { 
  getPlayersByName, 
  getPlayerData 
} = require('./handlers/basketballRef');
const { 
  getArticlesByQuery, 
  getFrontPageArticles,
} = require('./handlers/hackerNews');

const router = Router();

router.get('/hn', getFrontPageArticles)
router.get('/hn/:query', getArticlesByQuery)
router.get('/players/:name', getPlayersByName)
router.get('/players', getPlayersByName)
router.get('/player', getPlayerData)

module.exports = router;