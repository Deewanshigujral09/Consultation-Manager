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
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

console.log("SCHEMA FIELDS:");
console.log(Object.keys(recordingSchema.obj));

module.exports = mongoose.model("Recording", recordingSchema);
