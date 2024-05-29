import { TiArrowRight } from "react-icons/ti";
import { CiFileOn } from "react-icons/ci";
import { GiSeahorse } from "react-icons/gi";
import Login from "./Login";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";

const Hero = () => {
  const [login, setLogin] = useState(false);

  return (
    <section className="bg-white h-screen flex flex-col justify-center dark:bg-gray-900">
      <AnimatePresence>
        {login ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Login />
          </motion.div>
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12"
          >
            <a
              href="#"
              className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              role="alert"
            >
              <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span>
              <span className="text-sm font-medium">Have not you resume yet?</span>
              <TiArrowRight size="1.2rem" />
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              We are here to help you
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Build your resume, build your career
            </p>
            <div className="flex  flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                onClick={() => setLogin(!login)}
                className=" flex gap-4 justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Sign In
                <FaUserAlt size="1rem" />
              </a>
              <a
                href="#"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <CiFileOn size="1.5rem" />
                See templates
              </a>
            </div>
            <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
              <div className="flex flex-col justify-center items-center mt-8 text-gray-500 ">
                <p>Holberton School Azerbaijan</p>
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                  <GiSeahorse size="4rem" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
