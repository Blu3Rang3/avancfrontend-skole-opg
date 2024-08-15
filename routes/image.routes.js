    const express = require('express');
    const router = express.Router();
    
    const multer = require('multer');
    const path = require('path');
    const Image = require('../models/image.model');

    // Multer setup for handling file uploads
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage: storage });

    //-------GET - all images
    //-------------------------------------------------
    router.get('/', async (req, res) => {
        console.log("GET - Fetch all images");

        try {
            let images = await Image.find(); // Fetch all images
            return res.status(200).json({ images: images });
        } catch (error) {
            return res.status(400).json({ images: null, message: "Error fetching images: " + error.message });
        }
    });

    //-------GET - specified image by ID
    //-------------------------------------------------
    router.get('/:filename', (req, res) => {
        const filename = req.params.filename;
        const directoryPath = path.join(__dirname, '../public/images');
        const filePath = path.join(directoryPath, filename);
    
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error("Error sending image:", err);
                res.status(500).json({
                    image: null,
                    message: `Error fetching image: ${err.message}`
                });
            }
        });
    });

    //-------POST - upload new image
    //-------------------------------------------------
    router.post('/', upload.single('image'), async (req, res) => {
        console.log("POST - Upload new image");
    
        try {
            // Log request body and file information
            console.log('Request Body:', req.body);
            console.log('Uploaded File:', req.file);
    
            const { title, description } = req.body;
            if (!req.file || !title) {
                return res.status(400).json({ message: 'Title and image file are required.' });
            }
    
            const newImage = new Image({
                title: title,
                description: description,
                image: req.file.filename // Save the filename of the uploaded image
            });
    
            await newImage.save();
            return res.status(201).json({ message: "Image saved successfully", image: newImage });
        } catch (error) {
            return res.status(400).json({ message: "Error saving image: " + error.message });
        }
    });
    

    //-------PUT - update existing image
    //-------------------------------------------------
    router.put('/:id', upload.single('image'), async (req, res) => {
    console.log("PUT - Update image by ID");

    try {
        const { title, description } = req.body;
        const updateData = { title, description };

        if (req.file) {
            updateData.image = req.file.filename; // Update the image if a new file is uploaded
        }

        let image = await Image.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!image) {
            return res.status(404).json({ message: "Image not found", image: null });
        }

        return res.status(200).json({ message: "Image updated successfully", image: image });
    } catch (error) {
        return res.status(400).json({ message: "Error updating image: " + error.message });
    }
});

    //-------DELETE - remove image
    //-------------------------------------------------
    router.delete('/:id', async (req, res) => {
        console.log("DELETE - Remove image by ID");

        try {
            let image = await Image.findByIdAndDelete(req.params.id);
            if (!image) {
                return res.status(404).json({ message: "Image not found", image: null });
            }

            return res.status(200).json({ message: "Image deleted successfully", image: image });
        } catch (error) {
            return res.status(400).json({ message: "Error deleting image: " + error.message });
        }
    });

    module.exports = router;
