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
      } else if (e.key === "Escape") {
        router.push("/gallery");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex, photos]);

  const goTo = (index) => {
    if (index >= 0 && index < photos.length) {
      setCurrentIndex(index);
      router.push(`/photo/${photos[index].id}`, undefined, { shallow: true });
    }
  };

  const src = id ? `/api/photo/${id}` : "";
  const isLoaded = currentIndex >= 0 && photos.length > 0;
  const canGoPrev = isLoaded && currentIndex > 0;
  const canGoNext = isLoaded && currentIndex < photos.length - 1;

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
          {/* Close button */}
          <button
            onClick={() => router.push("/gallery")}
            className="absolute top-6 right-6 p-3 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-full hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all hover:scale-110 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Previous button */}
          <button
            onClick={() => canGoPrev && goTo(currentIndex - 1)}
            className={`absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-full hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all hover:scale-110 ${
              !canGoPrev ? "opacity-30 cursor-not-allowed hover:scale-100" : ""
            }`}
          >
            <img
              src="/images/back.svg"
              alt="Previous"
              className="w-10 h-10 dark:invert"
            />
          </button>
          {/* Next button */}
          <button
            onClick={() => canGoNext && goTo(currentIndex + 1)}
            className={`absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-full hover:bg-opacity-100 dark:hover:bg-opacity-100 transition-all hover:scale-110 ${
              !canGoNext ? "opacity-30 cursor-not-allowed hover:scale-100" : ""
            }`}
          >
            <img
              src="/images/back.svg"
              alt="Next"
              className="w-10 h-10 rotate-180 dark:invert"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
