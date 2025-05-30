import React from "react";
import Button from "../Button";
import { useTheme } from "next-themes";

const WorkCard = ({ img, name, description, github, onClick }) => {
  const { theme } = useTheme();
  if (!img && !name && !description && !github) {
    return null;
  }

  return (
    <>
      <div
        className="overflow-hidden rounded-xl p-4 laptop:p-6 first:ml-0 link flex flex-col items-start justify-start transition-all duration-300"
        onClick={onClick}
        style={{
          backdropFilter: "blur(10px)", // Glass effect
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            theme === "dark"
              ? "0 4px 20px rgba(255, 255, 255, 0.1)" // lighter shadow for dark bg
              : "0 4px 20px rgba(0, 0, 0, 0.1)"; // darker shadow for light bg
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {img && (
          <div
            className="flex justify-center items-center rounded-lg overflow-hidden transition-all ease-out duration-300 h-44 mob:h-auto w-full p-10"
            style={{ height: "500px" }}
          >
            <img
              alt={name}
              className="h-full w-auto object-cover transition-all ease-out duration-300"
              src={img}
            />
          </div>
        )}
        <div className="text-left mt-0 ml-2">
          <h1 className="text-3xl font-medium">
            {name ? name : "Project Name"}
          </h1>
          <h2 className="text-xl opacity-70 mt-2">
            {description ? description : "Description"}
          </h2>
        </div>
        {github && (
          <div
            className={`mt-2 pl-2 rounded-lg transition-all duration-300 ${
              theme === "dark" ? "bg-slate-600" : "bg-slate-100"
            }`}
          >
            <Button type="secondary" onClick={() => window.open(github)}>
              GitHub Repo.
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkCard;
