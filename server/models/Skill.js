const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    default: '💡',
  },
  items: {
    type: [String],
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Skill', skillSchema);
