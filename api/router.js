const { Router } = require('express');
const { 
  getPlayersByName, 
  getPlayerData 
} = require('./handlers/basketballRef');

const router = Router();

router.get('/players/:name', getPlayersByName)
router.get('/players', getPlayersByName)
router.get('/player', getPlayerData)

module.exports = router;