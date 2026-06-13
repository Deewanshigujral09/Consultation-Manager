require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const app = express();

const recordingRoutes = require("./routes/recordingRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/recordings", recordingRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});