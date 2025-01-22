const terrainModel = require("../Models/terrainModel"); 


module.exports.addTerrain = async (req, res) =>{
    const {name,location,Prix_Reservation} = req.body;
    if(req.file==null){
        console.log('====================================');
        console.log("no file terrain image ");
        console.log('====================================');
    }
    const { filename } = req.file;

    try {
        const terrain = new terrainModel( {name,location,image:filename,Prix_Reservation} );

        const AddedTerrain = await terrain.save(); 
        res.status(201).json({ AddedTerrain });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getTerrains = async (req, res) =>{
try {
    const terrains = await terrainModel.find();
    if (terrains.length === 0 && !terrains) {
        throw new Error ("No terrains found");
    }
    res.status(200).json({terrains});
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
}
module.exports.getTerrainsByName = async (req, res) => {
    try {
        // Get the name from the query parameters
        const { name } = req.params;

        // Find terrains by name (case insensitive)
        const terrains = await terrainModel.find({ name: { $regex: name, $options: 'i' } });

        if (terrains.length === 0) {
            return res.status(404).json({ message: "No terrains found with that name" });
        }

        res.status(200).json({ terrains });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.updateTerrain = async (req, res) =>{
    
    const {name,location,Prix_Reservation} = req.body;
    const {id} = req.params;
    console.log('====================================');
    const { filename } = req.file;
    console.log('====================================');
    console.log(filename);
    console.log('====================================');
    try {
        const checkIFterrainrExists = await terrainModel.findById(id); //false => undefined
        console.log(checkIFterrainrExists)

        if (!checkIFterrainrExists)
            {
                throw new Error ("terrain not found !")
            }
            //
           updated = await terrainModel.findByIdAndUpdate(
            id, {
              $set:{ name,location,Prix_Reservation,image:filename}
            },
            {new : true}
           )
        res.status(201).json({ updated });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports.deleteTerrain = async (req, res) =>{
    try{
        const {id} = req.params;
        const checkIFTerrainExists = await terrainModel.findById(id); //false => undefined
        if (!checkIFTerrainExists)
          {
              throw new Error ("Terrain not found !")
          }
        await terrainModel.findByIdAndDelete(id);
        res.status(200).json("deleted");
      }catch (err) {
        res.status(500).json({message: err.message});
      };
}