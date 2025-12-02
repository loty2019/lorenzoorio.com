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
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("all");
  const skeletonCount = 6;

  const displayedPhotos =
    selectedFolder === "all"
      ? photos
      : photos.filter((p) => p.folderId === selectedFolder);

  useEffect(() => {
    setMounted(true);
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos);
        setFolders(data.folders);
      });
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
      <div className={`relative ${data.showCursor && "cursor-none"}`}>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Gallery</title>
        </Head>
        <div className="gradient-circle"></div>
        <div className="gradient-circle-bottom"></div>
        <div className="container mx-auto mb-10">
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
            {folders.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-100/10">
                <button
                  onClick={() => setSelectedFolder("all")}
                  className={`flex items-center px-3 py-1 rounded link transition-all duration-300 hover:scale-110 ${
                    selectedFolder === "all"
                      ? "bg-slate-200 dark:bg-slate-700 text-black dark:text-white"
                      : "hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-5 mr-1"
                  >
                    <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                  </svg>
                  <span className="text-sm">All Photos</span>
                </button>
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`flex items-center px-3 py-1 rounded link transition-all duration-300 hover:scale-110 ${
                      selectedFolder === folder.id
                        ? "bg-slate-200 dark:bg-slate-700 text-black dark:text-white"
                        : "hover:bg-slate-200 dark:hover:bg-slate-700 text-black dark:text-white hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 mr-1"
                    >
                      <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                    </svg>
                    <span className="text-sm">{folder.name}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-8">
              {photos.length === 0
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <div
                      key={i}
                      className="h-96 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"
                    />
                  ))
                : displayedPhotos.map((photo) => (
                    <Link href={`/photo/${photo.id}`} key={photo.id}>
                      <div className="cursor-pointer overflow-hidden rounded-3xl hover:scale-105 transition-transform duration-300">
                        <div className="relative h-96 w-full rounded-3xl">
                          <Image
                            src={`/api/photo/${photo.id}`}
                            alt={photo.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  );
};

export default GalleryPage;
