const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');

// GET /api/certifications — get all certifications
router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find().sort({ createdAt: -1 });
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// POST /api/certifications — add a new certification
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required.' });
    const cert = new Certification({ name });
    await cert.save();
    res.status(201).json({ success: true, certification: cert });
  } catch (err) {
    console.error('Certification save error:', err.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/certifications/:id — delete a certification
router.delete('/:id', async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: 'Certification not found.' });
    res.json({ success: true, message: 'Certification deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
