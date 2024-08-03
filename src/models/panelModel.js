// models/Panel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  panel_id: { type: String, required: true, unique: true },
  z1: { type: Number, default: 0 },
  z2: { type: Number, default: 0 },
  z3: { type: Number, default: 0 },
  z4: { type: Number, default: 0 },
  z5: { type: Number, default: 0 },
  z6: { type: Number, default: 0 },
  z7: { type: Number, default: 0 },
  z8: { type: Number, default: 0 },
  z9: { type: Number, default: 0 },
  z10: { type: Number, default: 0 },
  z11: { type: Number, default: 0 },
  z12: { type: Number, default: 0 },
  z13: { type: Number, default: 0 },
  z14: { type: Number, default: 0 }
});

module.exports = mongoose.model('Panel', panelSchema);
