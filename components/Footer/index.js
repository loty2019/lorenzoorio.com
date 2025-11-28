import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";
import yourData from "../../data/portfolio.json";

const Footer = ({}) => {
  // Find the email social link from yourData.socials
  const emailSocial = yourData.socials.find(
    (social) => social.title.toLowerCase() === "email"
  );
  const emailLink = emailSocial ? emailSocial.link : "#";

  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <div>
          <h1 className="text-3xl text-bold">Contact.</h1>
          <div className="mt-10">
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              LET&apos;S WORK
            </h1>
            <h1 className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl text-bold">
              TOGETHER
            </h1>
            <Button
              type="primary"
              onClick={() => window.open(emailLink)}
            >
              Send me an Email
            </Button>
            <div className="mt-5">
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 laptop:p-0 flex flex-col items-center justify-center mt-2 laptop:mt-2">
        <h1 className="text-sm text-bold mt-2 laptop:mt-2 p-2 laptop:p-0">
          Made with ❤ by Me
        </h1>
        <div className="flex text-xs text-gray-500">
          &copy; {new Date().getFullYear()} lorenzoorio.com
        </div>
      </div>
    </>
  );
};

export default Footer;
