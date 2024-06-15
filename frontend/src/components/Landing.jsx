import { useState } from "react";
import Login from "./Login";
import landingPhoto from "../assets/landing.avif";
import Tilt from "react-next-tilt";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EFF2F9] relative dark:bg-[#1C1C1E] dark:text-white">
      <div className="h-screen flex flex-col gap-10 items-center justify-center   ">
        <div className="max-w-[1013px] ">
          <h1 className="text-[40px] font-bold	px-12 mt-8  text-center  ">
            Only 2% of resumes make it pas the first round. Be in the top 2%
          </h1>
        </div>
        <div className="max-w-[768px]">
          <p className="text-center px-7 text-[18px] font-[400] text-[#000] dark:text-white">
            Use professional field-tested resume templates that follow that
            exact &apos;resume rules&apos; employers look for. Easy to use and
            done within minutes - try now for free!
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("login")}
            className="bg-primary-500 font-bold inline-flex
             uppercase py-3 px-5 rounded-[6px] text-white
             hover:bg-white hover:text-primary-500 border-2 
             transition duration-300 ease-in-out
             border-primary-500 dark:bg-primary-400 
             "
          >
            Create my resume
          </button>
        </div>
        <div className="max-w-[750px]">
          <Tilt>
            <img
              className="] m-l-0 mr-auto ml-auto"
              src={landingPhoto}
              alt="hero"
            />
          </Tilt>
        </div>
      </div>
    </div>
  );
};

export default Landing;
