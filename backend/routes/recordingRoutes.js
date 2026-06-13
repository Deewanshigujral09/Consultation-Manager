const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAllRecordings,
  getRecording,
  createRecording,
  uploadRecording,
  updateRecording,
  deleteRecording,
} = require("../controllers/recordingController");

// routes — now just one line each, very clean
router.get("/", getAllRecordings);
router.get("/:id", getRecording);
router.post("/", createRecording);
router.post("/upload", upload.single("audio"), uploadRecording);
router.put("/:id", updateRecording);
router.delete("/:id", deleteRecording);

module.exports = router;