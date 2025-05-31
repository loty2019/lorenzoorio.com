import { useEffect, useState } from "react";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  return (
    <div className="min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Photography Gallery
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`/api/photo/${photo.id}`}
              alt={photo.name}
              className="w-full h-auto object-cover"
            />

            <div className="p-2 text-center text-sm text-gray-700 dark:text-gray-300">
              {photo.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
