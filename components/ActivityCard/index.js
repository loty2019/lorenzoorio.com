import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ActivityCard = ({ name, description, image, date, link }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 link`}
      onClick={() => link && window.open(link)}
    >
      {image && (
        <div className="w-fit h-96 overflow-hidden rounded-md mb-4">
          <img src={image} alt={name} className="object-cover" />
        </div>
      )}
      <h1 className="text-3xl">{name ? name : "Heading"}</h1>
      {date && <p className="text-sm opacity-60 mt-1">{date}</p>}

      {description.split("\n").map((line, idx) => (
        <p key={idx} className="mt-5 opacity-70 text-xl">
          {line}
        </p>
      ))}
    </div>
  );
};

export default ActivityCard; 
