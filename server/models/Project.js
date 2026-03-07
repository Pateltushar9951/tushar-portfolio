const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    teamSize: {
        type: Number,
        default: 1,
    },
    image: {
        type: String,
        default: '🚀',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);
