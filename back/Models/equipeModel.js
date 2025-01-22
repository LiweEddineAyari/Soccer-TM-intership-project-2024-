const mongoose = require("mongoose");

const equipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nbr_wins: {
      type: Number,
      default: 0,
    },
    nbr_loses: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to log when a new equipe is created and saved
equipeSchema.post("save", function (doc, next) {
  console.log("New equipe was created & saved successfully");
  next();
});

// Pre-save middleware to set timestamps
equipeSchema.pre("save", function (next) {
  this.createdAt = new Date();
  this.updatedAt = new Date();
  next();
});


const Equipe = mongoose.model("Equipe", equipeSchema);

module.exports = Equipe;
