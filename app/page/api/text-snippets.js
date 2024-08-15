// pages/api/text-snippets.js
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch text snippets from the database
    res.status(200).json({ snippets: [] });
  } else if (req.method === 'POST') {
    // Handle creating a new text snippet
    const newSnippet = req.body;
    // Save newSnippet to the database
    res.status(201).json({ message: 'Text snippet created', snippet: newSnippet });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
