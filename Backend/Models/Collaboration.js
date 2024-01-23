const mongoose = require("mongoose");

const collaborationSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cursorPosition: { type: Number, default: 0 },
  selectionStart: { type: Number, default: 0 },
  selectionEnd: { type: Number, default: 0 },
  // Add other collaboration-related fields as needed
});

const Collaboration = mongoose.model("Collaboration", collaborationSchema);

module.exports = Collaboration;
