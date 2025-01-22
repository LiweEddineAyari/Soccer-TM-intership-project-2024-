const matchModel = require("../Models/matchModel");
const equipeModel = require("../Models/equipeModel");
const terrainModel = require("../Models/terrainModel");

module.exports.addMatch = async (req, res) => {
  const { id_equipeA, id_equipeB, score, date, time, id_Terrain } = req.body;
  
  try {
    // Check if both teams exist
    const equipeA = await equipeModel.findById(id_equipeA);
    const equipeB = await equipeModel.findById(id_equipeB);
    if (!equipeA || !equipeB) {
      throw new Error("One or both teams not found");
    }

    // Check if the terrain exists
    const terrain = await terrainModel.findById(id_Terrain);
    if (!terrain) {
      throw new Error("Terrain not found");
    }

    // Create a new match
    const match = new matchModel({ id_equipeA, id_equipeB, score, date, time, id_Terrain });

    // Save the match to the database
    const addedMatch = await match.save();
  
    // Respond with the created match
    res.status(201).json({ addedMatch });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateMatchScore = async (req, res) => {
    const { id } = req.params;
    const { score } = req.body;
  
    try {
      const updatedMatch = await matchModel.findByIdAndUpdate(
        id,
        { score },
        { new: true, runValidators: true }
      );
  
      if (!updatedMatch) {
        return res.status(404).json({ message: "Match not found" });
      }
  
      res.status(200).json({ updatedMatch });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports.updateMatchDate = async (req, res) => {
const { id } = req.params;
const { date } = req.body;

try {
    const updatedMatch = await matchModel.findByIdAndUpdate(
    id,
    { date },
    { new: true, runValidators: true }
    );

    if (!updatedMatch) {
    return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ updatedMatch });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};



module.exports.updateMatchTime = async (req, res) => {
    const { id } = req.params;
    const { time } = req.body;
  
    try {
      const updatedMatch = await matchModel.findByIdAndUpdate(
        id,
        { time },
        { new: true, runValidators: true }
      );
  
      if (!updatedMatch) {
        return res.status(404).json({ message: "Match not found" });
      }
  
      res.status(200).json({ updatedMatch });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  


module.exports.getAllMatches = async (req, res) => {
try {
    const matches = await matchModel.find()
    .populate('id_equipeA')
    .populate('id_equipeB')
    .populate('id_Terrain');

    res.status(200).json({ matches });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};

  

module.exports.getMatchByName = async (req, res) => {
const { name } = req.params;

try {
    const match = await matchModel.find({ name: { $regex: name, $options: 'i' } })
    .populate('id_equipeA')
    .populate('id_equipeB')
    .populate('id_Terrain');

    if (!match) {
    return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ match });
} catch (err) {
    res.status(500).json({ message: err.message });
}
};  



module.exports.deleteMatchById = async (req, res) => {
  console.log('====================================');
  console.log("del");
  console.log('====================================');
  const { id } = req.params;

  try {
    await matchModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Match deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


