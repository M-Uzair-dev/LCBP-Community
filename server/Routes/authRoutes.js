const express = require("express");
const router = express.Router();

const User = require("../models/usermodel");
const Comm = require("../models/communityModel");
const Messages = require("../models/messageModel");

router.post("/signup", async (req, res) => {
  try {
    const { phone, password, name } = req.body;
    if (!phone || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "phone and password are required" });
    }

    const user = await User.findOne({ phone });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const newUser = new User({ name, phone, password });

    const savedUser = await newUser.save();
    res.status(201).json({ success: true, User: savedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res
        .status(400)
        .json({ success: false, message: "phone and password are required" });
    }
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    res.status(200).json({ success: true, User: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.post("/new", async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log(req.body);
    const user = await User.findById(id);
    console.log(user);

    if (!user.admin === "true") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    const newComm = new Comm({ name });

    newComm.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/get", async (req, res) => {
  try {
    const communities = await Comm.find({});
    res.status(200).json({ success: true, communities });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/messages", async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }
    const messages = await Messages.find({ community: id });
    const community = await Comm.findById(id);
    if (!messages) {
      return res.status(200).json({
        success: true,
        messages: [],
        name: community.name,
      });
    }
    res.status(200).json({ success: true, messages, name: community.name });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.post("/newMessage", async (req, res) => {
  try {
    const { userID, id, message } = req.body;
    if (!id || !message || !userID) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    const newMessage = new Messages({
      sentBy: userID,
      community: id,
      data: message,
    });
    let data = await newMessage.save();
    res.status(200).json({ success: true, savedMessage: data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;
