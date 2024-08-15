const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: String
    }
});

module.exports = mongoose.models.Image || mongoose.model('Image', imageSchema, 'images');
