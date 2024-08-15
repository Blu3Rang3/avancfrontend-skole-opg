const express = require('express');
const router = express.Router();
const textSnippet = require('../models/textSnippet.model'); // Ensure this path is correct

//-------GET - all text snippets
router.get('/', async (req, res) => {
    console.log("GET - Fetch all text snippets");
    try {
        let textSnippets = await textSnippet.find(); // Fetch all text snippets
        return res.status(200).json({ textSnippets: textSnippets });
    } catch (error) {
        return res.status(400).json({ textSnippets: null, message: "Error fetching text snippets: " + error.message });
    }
});

//-------GET - specified text snippet by ID
router.get('/:id', async (req, res) => {
    console.log("GET - Fetch text snippet by ID");
    try {
        let snippet = await textSnippet.findById(req.params.id); // Find snippet by ID
        if (!snippet) {
            return res.status(404).json({ snippet: null, message: "Text snippet not found" });
        }
        return res.status(200).json({ snippet: snippet });
    } catch (error) {
        return res.status(400).json({ snippet: null, message: "Error fetching text snippet: " + error.message });
    }
});

//-------POST - create new text snippet
router.post('/', async (req, res) => {
    console.log("POST - Create multiple text snippets");
    try {
        const snippets = req.body; // This should be an array of snippet objects

        if (!Array.isArray(snippets) || snippets.length === 0) {
            return res.status(400).json({ message: "Invalid input: Expecting an array of text snippets." });
        }

        // Validate and save each snippet
        const savedSnippets = [];
        const keys = new Set(); // To keep track of unique keys

        for (const snippetData of snippets) {
            // Validate each snippet
            const { key, text } = snippetData;
            if (!key || !text) {
                return res.status(400).json({ message: "Each text snippet must have a key and text." });
            }

            // Check for duplicates
            if (keys.has(key)) {
                return res.status(400).json({ message: `Duplicate key detected: ${key}` });
            }
            keys.add(key);

            // Create a new text snippet
            const newSnippet = new textSnippet({ key, text });

            // Save the snippet to the database
            try {
                const savedSnippet = await newSnippet.save();
                savedSnippets.push(savedSnippet);
            } catch (err) {
                // Handle duplicate key error or other validation errors
                if (err.code === 11000) {
                    return res.status(400).json({ message: `Duplicate key error: ${err.message}` });
                } else {
                    throw err;
                }
            }
        }

        return res.status(201).json({ message: "Text snippets created", created: savedSnippets });
    } catch (error) {
        return res.status(400).json({ message: "Error creating text snippets: " + error.message, created: null });
    }
});

//-------PUT - update existing text snippet by ID
router.put('/:id', async (req, res) => {
    console.log("PUT - Update text snippet by ID");
    try {
        let snippet = await textSnippet.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update snippet by ID
        if (!snippet) {
            return res.status(404).json({ message: "Text snippet not found", updated: null });
        }
        return res.status(200).json({ message: "Text snippet updated", updated: snippet });
    } catch (error) {
        return res.status(400).json({ message: "Error updating text snippet: " + error.message, updated: null });
    }
});

//-------DELETE - remove text snippet by ID
router.delete('/:id', async (req, res) => {
    console.log("DELETE - Remove text snippet by ID");
    try {
        let snippet = await textSnippet.findByIdAndDelete(req.params.id); // Remove snippet by ID
        if (!snippet) {
            return res.status(404).json({ message: "Text snippet not found", deleted: null });
        }
        return res.status(200).json({ message: "Text snippet deleted", deleted: snippet });
    } catch (error) {
        return res.status(400).json({ message: "Error deleting text snippet: " + error.message, deleted: null });
    }
});

module.exports = router;
