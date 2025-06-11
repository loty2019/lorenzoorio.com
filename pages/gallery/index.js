import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import data from "../../data/portfolio.json";

const GalleryPage = () => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const [mounted, setMounted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const skeletonCount = 6;

  useEffect(() => {
    setMounted(true);
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  useEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    showBlog.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Gallery</title>
        </Head>
        <div className="gradient-circle mt-10"></div>
        <div
          className={`container mx-auto mb-10 ${
            data.showCursor && "cursor-none"
          }`}
        >
          <Header isBlog={true}></Header>
          <div className="mt-10">
            <ContentSection
              className="text-bold text-xl tablet:text-3xl laptop:text-4xl"
              text="Photography Gallery"
            />
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Gallery.
            </h1>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-8">
              {photos.length === 0
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <div
                      key={i}
                      className="h-96 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"
                    />
                  ))
                : photos.map((photo) => (
                    <Link href={`/photo/${photo.id}`} key={photo.id}>
                      <div className="cursor-pointer">
                        <div className="relative h-96 w-full overflow-hidden hover:scale-105 transition-transform duration-300">
                          <Image
                            src={photo.url}
                            alt={photo.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-xl shadow-md shadow-black/10"
                            unoptimized
                          />
                        </div>
                        {photo.date && (
                          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                            {photo.date}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  );
};

export default GalleryPage;
