const mongoose = require('mongoose');

const terrainSchema = new mongoose.Schema(
  {
    name:  String,
    location:  String,
    image:  { type: String, required: false, default: "terrain.png" },
    Prix_Reservation:   Number
  },
  { timestamps: true }
);

terrainSchema.post('save', async function (req, res, next) {
  console.log('New terrain was created & saved successfully');
  next();
});

terrainSchema.pre('save', async function (next) {
  const terrain = this;
  if (terrain.isNew) {
    terrain.CreatedAt = new Date();
    terrain.UpdatedAt = new Date();
  } else {
    terrain.UpdatedAt = new Date();
  }
  next();
});

const Terrain = mongoose.model('Terrain', terrainSchema);

module.exports = Terrain;
