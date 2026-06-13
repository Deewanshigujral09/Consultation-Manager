const Recording = require("../models/Recording");

// GET all recordings
const getAllRecordings = async (req, res) => {
  try {
    const recordings = await Recording.find().sort({ createdAt: -1 });
    res.json(recordings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET single recording
const getRecording = async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: "Recording not found" });
    }
    res.json(recording);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// POST create without file
const createRecording = async (req, res) => {
  try {
    const recording = new Recording(req.body);
    await recording.save();
    res.status(201).json(recording);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const recording = await Recording.create({
  title: req.body.title,
  category: req.body.category,
  clientName: req.body.clientName,
  consultationDate: req.body.consultationDate,
  notes: req.body.notes,
  filePath: req.file ? "/uploads/" + req.file.filename : "",
});

// PUT update recording
const updateRecording = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const recording = await Recording.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("UPDATED RECORD:", recording);

    res.json(recording);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// DELETE recording
const deleteRecording = async (req, res) => {
  try {
    await Recording.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecordings,
  getRecording,
  createRecording,
  uploadRecording,
  updateRecording,
  deleteRecording,
};