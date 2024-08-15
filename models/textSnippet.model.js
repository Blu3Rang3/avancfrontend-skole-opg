const mongoose = require('mongoose');

const textSnippetSchema = new mongoose.Schema({
    key: { // Unique key to identify the snippet
        type: String,
        required: true, // Make this required if it's a necessary field
        unique: true
    },
    text: { // The actual text snippet
        type: String,
        required: true // Make this required if it's a necessary field
    }
});

module.exports = mongoose.model('TextSnippet', textSnippetSchema, 'textSnippets');
