import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/features/auth/authSlice";
import Button from "./Button";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { baseUrl } from "~/utils/api";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username_or_email, password } = Object.fromEntries(formData);

    if (!username_or_email || !password) {
      setError("Both fields are required");
      return;
    }

    const newUser = { username_or_email, password };
    try {
      const response = await dispatch(login(newUser));
      const data = unwrapResult(response);
      Cookies.set("accessToken", data.token);
      navigate("/app");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className="w-full h-screen justify-center gap-8 flex items-center  ">
      <div
        className="bg-primary-300 h-[600px] gap-24 hidden  md:flex flex-col rounded-2xl
        justify-center items-center max-w-[500px]
        dark:bg-primary-400 dark:text-white
        "
      >
        <div className="text-[35px] text-center">
          <h1>Esago is your primary CV and Resume maker</h1>
        </div>
        <div className="bg-primary-100 flex h-[212px] rounded-lg  dark:bg-darkPrimary-800">
          <div
            className="flex flex-col items-center w-[200px]   border-r-2 border-gray-300
          dark:border-gray-500 
          justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 dark:text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>

            <h1>A lot of templates</h1>
          </div>
          <div className="flex flex-col items-center w-[200px] justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-14 dark:text-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <h1>Filter any resume</h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center  h-[600px] max-w-[500px] text-gray-600  space-y-8">
        <div className="text-center">
          <div className=" space-y-2">
            <h3 className="text-gray-800 dark:text-white text-2xl font-bold sm:text-3xl">
              Welcome again to Esago CV and resume maker platform
            </h3>
            <p className="text-gray-800 dark:text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                href="#"
                className="font-medium text-primary-500 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form
          className="flex flex-col w-[80%] ml-auto mr-auto "
          onSubmit={handleSignIn}
        >
          <div className="mb-2">
            <label
              className="font-medium dark:text-[#D4D4D4]"
              htmlFor="username_or_email"
            >
              Email
            </label>
            <input
              id="username_or_email"
              type="email"
              name="username_or_email"
              required
              className="w-full mt-2 px-3 py-2 input-primary"
            />
          </div>
          <div>
            <label
              className="font-medium dark:text-[#D4D4D4]"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 input-primary"
            />

            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div className="flex flex-col gap-4">
            <button className="button-primary mt-4 ">Sign in</button>
            <a className="dark:text-[#D4D4D4]" href={`${baseUrl}/google/login`}>
              Login with google
            </a>
          </div>
        </form>

        <div className="text-center">
          <a href="#" className="block   text-gray-900 dark:text-[#D4D4D4] ">
            Forgot password?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
