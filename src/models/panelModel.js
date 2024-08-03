// models/Panel.js
const mongoose = require('mongoose');

const panelSchema = new mongoose.Schema({
  panel_id: { type: String, required: true },
  zone_name: { type: String, required: true },
  alarm_mode: { type: Number, required: true },
  fire_alarm: { type: Number, required: true },
  dvr_nvr_status: { type: Number, required: true },
  camera_status: { type: Number, required: true },
  hdd_status: { type: Number, required: true },
});

module.exports = mongoose.model('Panel', panelSchema);
