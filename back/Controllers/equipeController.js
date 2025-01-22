const equipeModel = require("../Models/equipeModel"); 
const userModel = require("../Models/userModel"); 


module.exports.addEquipe = async (req, res) => {
    const { name, creator, nbr_wins, nbr_loses } = req.body;
    try {
      const equipe = new equipeModel({ name, creator, nbr_wins, nbr_loses });

      const user = await userModel.findById(creator);
      if (!user) {
        throw new Error("User not found");
      }

      await userModel.findByIdAndUpdate(creator, {
        $push: { equipes: equipe._id },
      });

      const AddedEquipe = await equipe.save(); //
  
      res.status(201).json({ AddedEquipe });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }; 
  module.exports.getEquipesByName = async (req, res) => {
    const { name } = req.params;
  
    try {
      const equipes = await equipeModel.find({ name: { $regex: name, $options: 'i' } }).populate("creator"); // Case-insensitive search
  
      if (!equipes || equipes.length === 0) {
        return res.status(404).json({ message: "No teams found" });
      }
  
      res.status(200).json({ equipes });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


module.exports.updateEquipeName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    try {
      const updatedEquipe = await equipeModel.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true }
      );
  
      if (!updatedEquipe) {
        return res.status(404).json({ message: "Equipe not found" });
      }
  
      res.status(200).json({ updatedEquipe });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  module.exports.updateEquipeNbrWins = async (req, res) => {
    const { id } = req.params;
    const { nbr_wins } = req.body;
  
    try {
      const updatedEquipe = await equipeModel.findByIdAndUpdate(
        id,
        { nbr_wins },
        { new: true, runValidators: true }
      );
  
      if (!updatedEquipe) {
        return res.status(404).json({ message: "Equipe not found" });
      }
  
      res.status(200).json({ updatedEquipe });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  module.exports.updateEquipeNbrLoses = async (req, res) => {
    const { id } = req.params;
    const { nbr_loses } = req.body;
  
    try {
      const updatedEquipe = await equipeModel.findByIdAndUpdate(
        id,
        { nbr_loses },
        { new: true, runValidators: true }
      );
  
      if (!updatedEquipe) {
        return res.status(404).json({ message: "Equipe not found" });
      }
  
      res.status(200).json({ updatedEquipe });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

  module.exports.deleteEquipe = async (req, res) =>{
    try{
        const {id} = req.params;
        const checkIFEquipeExists = await equipeModel.findById(id); //false => undefined
        if (!checkIFEquipeExists)
          {
              throw new Error ("Terrain not found !")
          }
        
        await userModel.updateMany({},{$pull : {equipes : id}})  
        await equipeModel.findByIdAndDelete(id);
        
        res.status(200).json("deleted");
      }catch (err) {
        res.status(500).json({message: err.message});
      };
}  

module.exports.getEquipes = async (req, res) =>{
    try {
        const equipes = await equipeModel.find().populate("creator");
        if (equipes.length === 0 && !equipes) {
            throw new Error ("No equipes found");
        }
        res.status(200).json({equipes});
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    }