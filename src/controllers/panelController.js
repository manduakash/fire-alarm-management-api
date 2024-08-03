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
  const { panel_id } = req.query;
  // find by panel id 
  const fetch = await Panel.findOne({ panel_id });
  if (fetch) {
    return res.status(400).json({ status: 0, message: 'Panel already exists', data: null });
  }
  else{
    var panel = new Panel({
      panel_id: req.query.panel_id,
      z1: req.query.z1,
      z2: req.query.z2,
      z3: req.query.z3,
      z4: req.query.z4,
      z5: req.query.z5,
      z6: req.query.z6,
      z7: req.query.z7,
      z8: req.query.z8,
      z9: req.query.z9,
      z10: req.query.z10,
      z11: req.query.z11,
      z12: req.query.z12,
      z13: req.query.z13,
      z14: req.query.z14
    });
  }
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
    const { panel_id } = req.params;
    const panel = await Panel.findOne({panel_id});
    res.json({ status: 1, message: 'Data fetched successfully', data: panel });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};

exports.updatePanel = async (req, res) => {
  try {
    const { panel_id } = req.query;
    const fetch = await Panel.findOne({panel_id});
    if (fetch) {
      await Panel.updateOne({ panel_id: req.params.panel_id }, { $set: req.query });
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
    const { panel_id } = req.query;
    const fetch = await Panel.findOne({panel_id});
    if (fetch) {
      await Panel.deleteOne({ panel_id: req.query.panel_id });
      res.status(201).json({ status: 1, message: "Deleted successfully" });
    } else {
      res.status(404).json({ status: 0 ,message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};

