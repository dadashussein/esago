import { useState } from "react";
import Login from "./Login";

const Landing = () => {
  const [login, setLogin] = useState(false);
  return (
    <div>
      {login ? (
        <Login />
      ) : (
        <div className="w-full h-screen flex flex-col gap-8 items-center justify-center ">
          <div className="w-[1013px] ">
            <h1 className="text-[60px]  text-center">
              Some very motivating text about CV and Resume (slogan).
            </h1>
          </div>
          <div className="w-[768px]">
            <p className="text-center text-[18px] font-[400] text-[#000]">
              Our site is the best the bestthe best the bestthe best the bestthe
              best the bestthe best the bestthe best the bestthe best the
              bestthe best the bestthe best the best
            </p>
          </div>
          <div className="flex gap-4">
            <button className="bg-primary-500 inline-flex py-[10px] px-[30px] rounded-[20px] text-white">
              Get started
            </button>
            <button
              onClick={() => setLogin(!login)}
              className=" bg-primary-400  inline-flex py-[10px] px-[30px] rounded-[20px] text-primary-500"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
