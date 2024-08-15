"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [navImages, setNavImages] = useState({
    nav1: null,
    nav2: null,
    nav3: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImage(url, key) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching image: ${key}`);
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error(err.message);
        return null;
      }
    }

    async function fetchNavImages() {
      try {
        const imageUrls = await Promise.all([
          fetchImage(`${process.env.NEXT_PUBLIC_API_URL}/images/nav-1.png`, 'nav1'),
          fetchImage(`${process.env.NEXT_PUBLIC_API_URL}/images/nav-2.png`, 'nav2'),
          fetchImage(`${process.env.NEXT_PUBLIC_API_URL}/images/nav-3.png`, 'nav3'),
        ]);

        setNavImages({
          nav1: imageUrls[0],
          nav2: imageUrls[1],
          nav3: imageUrls[2],
        });
      } catch (err) {
        setError(`Error fetching navigation images: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchNavImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <header className="bg-white shadow-md py-6">
      <div className="container flex px-14 justify-start items-start">
        <nav className="flex space-x-4">
          {navImages.nav3 && (
            <Link href="/front-get-in-touch">
              <div>
                <img src={navImages.nav3} alt="Nav 3" className="w-16 h-auto object-cover rounded-md" />
              </div>
            </Link>
          )}
          {navImages.nav2 && (
            <Link href="/front-maintainable">
              <div>
                <img src={navImages.nav2} alt="Nav 2" className="w-16 h-auto object-cover rounded-md" />
              </div>
            </Link>
          )}
          {navImages.nav1 && (
            <Link href="/front-what-we-do">
              <div>
                <img src={navImages.nav1} alt="Nav 1" className="w-16 h-auto object-cover rounded-md" />
              </div>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
