// src/controllers/apiController.js
const Panel = require('../models/panelModel');

// Get all panels
exports.getAllPanels = async (req, res) => {
  try {
    const panels = await Panel.find();
    res.json({ status: 1, message: 'Data fetched successfully', data: panels });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

// Create panel
exports.createPanel = async (req, res) => {
  const panel = new Panel({
    panel_id: req.body.panel_id,
    zone_name: req.body.zone_name,
    alarm_mode: req.body.alarm_mode,
    fire_alarm: req.body.fire_alarm,
    dvr_nvr_status: req.body.dvr_nvr_status,
    camera_status: req.body.camera_status,
    hdd_status: req.body.hdd_status,
  });

  try {
    const newPanel = await panel.save();
    res.status(201).json({ status: 1, message: 'Data added successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

exports.getPanelById = async (req, res) => {
  try {
    const panel = await Panel.findById(req.params.id);
    res.json({ status: 1, message: 'Data fetched successfully', data: panel });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

exports.updatePanel = async (req, res) => {
  try {
    const fetch = await Panel.findById(req.params.id);

    if (fetch) {
      await Panel.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json({ status: 1, message: "Updated successfully" });
    } else {
      res.status(404).json({ status: 0, message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};

exports.deletePanel = async (req, res) => {
  try {
    const fetch = await Panel.findById(req.params.id);
    if (fetch) {
      await Panel.deleteOne({ _id: req.params.id });
      res.status(201).json({ status: 1, message: "Deleted successfully" });
    } else {
      res.status(404).json({ status: 0 ,message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};

