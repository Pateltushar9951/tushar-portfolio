const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Save a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    console.error('Contact save error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// GET /api/contact - Retrieve all messages
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// DELETE /api/contact/:id - Delete a message
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Message not found.' });
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
