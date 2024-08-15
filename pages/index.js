"use client"
import { useEffect, useState } from 'react';
import ImageLink from '../app/components/ImageLink';
import RootLayout from '@/app/layout';


export default function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch images from the API
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.images) {
          setImages(data.images);
        } else {
          console.error('Invalid data format:', data);
          setImages([]); // Set to empty array to prevent errors
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setImages([]); // Set to empty array in case of error
      })
      .finally(() => setLoading(false)); // Set loading to false when done
  }, []);

  // Filter the images for the specific ones we need
  const filteredImages = images.filter(image =>
    ['front-what-we-do', 'front-maintainable', 'front-get-in-touch'].includes(image.title)
  );

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  
  return (
    <RootLayout>
    <div className='bg-gradient-to-b from-white to-lightblue min-h-screen'>
      <div className="flex justify-center">
        {filteredImages.map((image) => (
          <ImageLink 
            key={image._id}  // Use the unique _id for the key
            href={`/${image.title.toLowerCase().replace(/ /g, '-')}`}  // Generate href based on title
            imgSrc={`http://localhost:5000/images/${image.image}`}  // Use the correct URL for image source
            alt={image.title}   // Use the title for alt text
          />
        ))}
      </div>
    </div>
    </RootLayout>
  );
}
