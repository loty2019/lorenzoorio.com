/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

const PhotoPage = () => {
  const { id } = useRouter().query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <img
        src={`/api/photo/${id}?w=1920`}
        alt=""
        className="max-w-full  max-h-screen object-contain rounded-lg shadow-lg"
      />
    </div>
  );
};

export default PhotoPage;
