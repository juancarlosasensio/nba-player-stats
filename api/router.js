const { Router } = require('express');
const { 
  getArticlesByQuery, 
  getFrontPageArticles,
  getPlayersByName 
} = require('./handlers/hackerNews');

const router = Router();

router.get('/hn', getFrontPageArticles)
router.get('/hn/:query', getArticlesByQuery)
router.get('/players/:name', getPlayersByName)

module.exports = router;