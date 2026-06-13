const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    consultationDate: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Interview",
    },

    filePath: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Recording", recordingSchema);
