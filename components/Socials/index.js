import React from "react";
import Button from "../Button";

import yourData from "../../data/portfolio.json";
import Image from "next/image";

const Socials = ({ className }) => {
  return (
    <div className={`${className} flex flex-wrap mob:flex-nowrap link`}>
      {yourData.socials.map((social, index) => (
        <Button key={index} onClick={() => window.open(social.link)}>
          <span className="flex items-center">
            {social.logo && (
              <img
                src={social.logo}
                alt="Logo"
                width={16}
                height={16}
                className="mr-2 filter grayscale"
                style={{ minWidth: 16, minHeight: 16 }}
              />
            )}
            {social.title}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default Socials;
