// src/controllers/apiController.js

const Example = require("../models/exampleModel");

// get(all) api : starts
exports.getExamples = async (req, res) => {
  try {
    const examples = await Example.find();
    res.json({ status: 1, message: 'Data fetched successfully', data: examples });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// get(all) api : ends

// get(single) api : starts
exports.getExampleById = async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    res.json({ status: 1, message: 'Data fetched successfully', data: example });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// get(single) api : ends

// save api : starts
exports.createExample = async (req, res) => {
  const example = new Example({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const newExample = await example.save();
    res.status(201).json({ status: 1, message: 'Data added successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error', data: null });
  }
};
// save api : ends

// update api : starts
exports.updateExample = async (req, res) => {
  try {
    const fetch = await Example.findById(req.params.id);

    if (fetch) {
      await Example.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(201).json({ status: 1, message: "Updated successfully" });
    } else {
      res.status(404).json({ status: 0, message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};
// update api : ends

// delete api : starts
exports.deleteExample = async (req, res) => {
  try {
    const fetch = await Example.findById(req.params.id);
    if (fetch) {
      await Example.deleteOne({ _id: req.params.id });
      res.status(201).json({ status: 1, message: "Deleted successfully" });
    } else {
      res.status(404).json({ status: 0 ,message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: 0, message: 'Internal server error' });
  }
};
// delete api : ends
