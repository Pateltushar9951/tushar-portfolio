const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects - Retrieve all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/projects - Add a new project
router.post('/', async (req, res) => {
  try {
    const { title, description, category, techStack, teamSize, image } = req.body;
    if (!title || !description || !category || !techStack) {
      return res.status(400).json({ error: 'Required fields missing.' });
    }
    const project = new Project({ title, description, category, techStack, teamSize, image });
    await project.save();
    res.status(201).json({ success: true, project });
  } catch (err) {
    console.error('Project save error:', err.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/projects/:id - Update a project
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json({ success: true, project });
  } catch (err) {
    console.error('Project update error:', err.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found.' });
    res.json({ success: true, message: 'Project deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
