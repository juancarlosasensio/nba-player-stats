const { Router } = require('express');
const { 
  getPlayersByName 
} = require('./handlers/basketballRef');
const { 
  getArticlesByQuery, 
  getFrontPageArticles,
} = require('./handlers/hackerNews');

const router = Router();

router.get('/hn', getFrontPageArticles)
router.get('/hn/:query', getArticlesByQuery)
router.get('/players/:name', getPlayersByName)

module.exports = router;