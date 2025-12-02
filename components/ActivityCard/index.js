import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ActivityCard = ({ name, description, image, date, link }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();
  const [expanded, setExpanded] = useState(false);
  const charLimit = 198;

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldTruncate = description && description.length > charLimit;
  const displayDescription =
    shouldTruncate && !expanded
      ? description.slice(0, charLimit) + "..."
      : description;

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

      {displayDescription.split("\n").map((line, idx) => (
        <p key={idx} className="mt-5 opacity-70 text-xl">
          {line}
        </p>
      ))}
      {shouldTruncate && (
        <button
          className="text-sm mt-3 opacity-60 hover:opacity-100 underline transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ActivityCard;
