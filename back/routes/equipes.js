var express = require('express');
var router = express.Router();
var equipeController = require('../Controllers/equipeController')

/* GET home page. */
router.get('/getEquipes',equipeController.getEquipes );
router.post('/addEquipe',equipeController.addEquipe );
router.put("/updateEquipeName/:id", equipeController.updateEquipeName);
router.put("/updateEquipeNbrWins/:id", equipeController.updateEquipeNbrWins);
router.put("/updateEquipeNbrLoses/:id", equipeController.updateEquipeNbrLoses);
router.delete('/deleteEquipes/:id',equipeController.deleteEquipe );
router.get('/getEquipesByName/:name', equipeController.getEquipesByName);

module.exports = router;
