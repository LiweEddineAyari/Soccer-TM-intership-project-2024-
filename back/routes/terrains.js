var express = require('express');
var router = express.Router();
var terrainController = require('../Controllers/TerrainController')
const upload = require("../middlewares/uploadFile")

/* GET home page. */

router.post('/addTerrain',upload.single("image"),terrainController.addTerrain);
router.get('/getTerrains',terrainController.getTerrains);
router.get('/getTerrainsByName/:name',terrainController.getTerrainsByName);

router.put('/updateTerrain/:id',upload.single("image"),terrainController.updateTerrain);
router.delete('/deleteTerrain/:id',terrainController.deleteTerrain);

module.exports = router;
