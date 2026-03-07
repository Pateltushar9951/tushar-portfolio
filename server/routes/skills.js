const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET /api/skills — get all skill categories
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/skills — add a new skill category
router.post('/', async (req, res) => {
  try {
    const { category, icon, items, order } = req.body;
    if (!category || !items || !items.length) {
      return res.status(400).json({ error: 'Category and items are required.' });
    }
    const skill = new Skill({ category, icon, items, order });
    await skill.save();
    res.status(201).json({ success: true, skill });
  } catch (err) {
    console.error('Skill save error:', err.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// PUT /api/skills/:id — update a skill category
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ error: 'Skill not found.' });
    res.json({ success: true, skill });
  } catch (err) {
    console.error('Skill update error:', err.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/skills/:id — delete a skill category
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: 'Skill not found.' });
    res.json({ success: true, message: 'Skill deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
