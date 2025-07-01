import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos));
  }, []);

  useEffect(() => {
    if (photos.length && id) {
      const idx = photos.findIndex((p) => p.id === id);
      setCurrentIndex(idx);
    }
  }, [photos, id]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        goTo(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        goTo(currentIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, photos]);

  const goTo = (index) => {
    if (index >= 0 && index < photos.length) {
      router.push(`/photo/${photos[index].id}`, undefined, { shallow: true });
    }
  };

  const src = id ? `/api/photo/${id}` : "";

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
      {id && (
        <div className="relative w-full h-screen">
          <Image
            src={src}
            alt=""
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
          {photos.length > 0 && currentIndex > 0 && (
            <button
              onClick={() => goTo(currentIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100"
            >
              <img
                src="/images/back.svg"
                alt="Previous"
                className="w-6 h-6"
              />
            </button>
          )}
          {photos.length > 0 && currentIndex < photos.length - 1 && (
            <button
              onClick={() => goTo(currentIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100"
            >
              <img src="/images/back.svg" alt="Next" className="w-6 h-6 rotate-180" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
