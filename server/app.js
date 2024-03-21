const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://lcbp-community.vercel.app",
  })
);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
