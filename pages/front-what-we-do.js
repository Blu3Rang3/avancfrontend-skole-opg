import RootLayout from '@/app/layout';
import React, { useEffect, useState } from 'react';

export default function FrontWhatWeDo() {
  const [imageSrc, setImageSrc] = useState(null);
  const [titleSnippet, setTitleSnippet] = useState('Loading title...');
  const [contentSnippet, setContentSnippet] = useState('Loading content...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch image
        const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/front-what-we-do-link.png`);
        if (!imageResponse.ok) {
          throw new Error('Error fetching image');
        }
        const blob = await imageResponse.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);

        // Fetch title snippet
        const titleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/text-snippets/66bb28352f4463f4250d865c`);
        if (!titleResponse.ok) {
          throw new Error('Error fetching title snippet');
        }
        const titleData = await titleResponse.json();
        setTitleSnippet(titleData.snippet.text || 'Default title');

        // Fetch content snippet
        const contentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/text-snippets/66bb28352f4463f4250d8662`);
        if (!contentResponse.ok) {
          throw new Error('Error fetching content snippet');
        }
        const contentData = await contentResponse.json();
        setContentSnippet(contentData.snippet.text || 'Default content');

      } catch (err) {
        setError(err.message);
        setImageSrc(null); // Clear image if there's an error
        setTitleSnippet('Error fetching title');
        setContentSnippet('Error fetching content');
      } finally {
        setLoading(false); // Always set loading to false after the fetch completes
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <RootLayout>
      <div className="flex items-center justify-center min-h-screen bg-lightblue">
        <div className="flex rounded-lg p-6 max-w-4xl">
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="WhatWeDo" 
              className="w-40 h-auto mr-6 rounded-lg"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold mb-4 text-black">{titleSnippet}</h1>
            <p className="text-black font-bold">{contentSnippet}</p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
