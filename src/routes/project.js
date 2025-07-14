const express = require("express");
const Project = require("../models/project");
const { userAuth } = require("../middlewares/auth");

const projectsRouter = express.Router();

// Create a new project (POST /projects)
projectsRouter.post("/projects", userAuth, async (req, res) => {
  try {
    const { title, description, techStack, github, demo, screenshot } = req.body;
    const owner = req.user._id;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).send("Title and description are required");
    }

    const techStackArray = Array.isArray(techStack)
      ? techStack.map((t) => t.trim()).filter(Boolean)
      : (typeof techStack === "string"
          ? techStack.split(",").map((t) => t.trim()).filter(Boolean)
          : []);

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      techStack: techStackArray,
      github: github ? github.trim() : "",
      demo: demo ? demo.trim() : "",
      screenshot: screenshot ? screenshot.trim() : "",
      owner,
    });

    res.json(project);
  } catch (err) {
    res.status(400).send("Error adding project: " + err.message);
  }
});

// Get all projects for the logged-in user (GET /projects/mine)
projectsRouter.get("/projects/mine", userAuth, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.json(projects);
  } catch (err) {
    res.status(400).send("Error fetching projects: " + err.message);
  }
});

module.exports = projectsRouter;
