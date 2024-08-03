// src/routes/api.js

const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Define the API routes
router.get('/get-all-examples', apiController.getExamples);
router.post('/save-example', apiController.createExample);
router.get('/get-example/:id', apiController.getExampleById);
router.put('/update-example/:id', apiController.updateExample);
router.delete('/delete-example/:id', apiController.deleteExample);

module.exports = router;
