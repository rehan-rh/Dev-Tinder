const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    github: { type: String, trim: true },
    demo: { type: String, trim: true },
    screenshot: { type: String, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Reference to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
