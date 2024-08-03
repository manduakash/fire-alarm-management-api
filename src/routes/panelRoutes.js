// src/routes/panelRoutes.js

const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');

// Panel routes
router.get('/get-all-panels', panelController.getAllPanels);
router.post('/save-panel', panelController.createPanel);
router.get('/get-panel/:panel_id', panelController.getPanelById);
router.put('/update-panel/:panel_id', panelController.updatePanel);
router.delete('/delete-panel/:panel_id', panelController.deletePanel);

module.exports = router;
