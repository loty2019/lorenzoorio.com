import Image from "next/image";
import { useRouter } from "next/router";

const PhotoPage = () => {
  const { id } = useRouter().query;

  const src = id ? `/api/photo/${id}` : "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {id && (
        <div className="relative w-full h-screen">
          <Image
            src={src}
            alt=""
            layout="fill"
            objectFit="contain"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PhotoPage;
