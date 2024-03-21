const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  data: {
    type: "string",
    required: [true, "text is required."],
  },
  sentBy: {
    type: "string",
    required: [true, "sentBy is required."],
  },
  community: {
    type: "string",
    required: [true, "Community is required."],
  },
});

module.exports = mongoose.model("messages", messagesSchema);
