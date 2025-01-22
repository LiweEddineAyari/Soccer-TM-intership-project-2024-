const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  id_equipeA: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe', required: true },
  id_equipeB: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipe', required: true },
  score: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Added time attribute
  id_Terrain: { type: mongoose.Schema.Types.ObjectId, ref: 'Terrain', required: true }
});


// Middleware to log when a new equipe is created and saved
matchSchema.post("save", function (doc, next) {
    console.log("New Match was created & saved successfully");
    next();
});
  
// Pre-save middleware to set timestamps
matchSchema.pre("save", function (next) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    next();
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
