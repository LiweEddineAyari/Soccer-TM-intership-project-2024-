var express = require('express');
var router = express.Router();
var matchController = require('../Controllers/matchController')

/* GET home page. */
router.post('/addMatch',matchController.addMatch);
router.put('/updateMatchScore/:id',matchController.updateMatchScore);
router.put('/updateMatchDate/:id',matchController.updateMatchDate);
router.put('/updateMatchTime/:id',matchController.updateMatchTime);
router.get('/getAllMatches',matchController.getAllMatches);
router.get('/getMatchByName/:name',matchController.getMatchByName);
router.delete('/deleteMatch/:id', matchController.deleteMatchById);


module.exports = router;
