import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

// Helper function to get the list of images
const getImages = () => {
  const imageDir = path.join(process.cwd(), 'public/images');
  return fs.readdirSync(imageDir).map(file => `/images/${file}`);
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Get the list of images
    const images = getImages();
    res.status(200).json({ images });
  } else if (req.method === 'POST') {
    // Handle image upload (this would require further setup)
    res.status(405).json({ message: 'POST method is not yet implemented.' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
