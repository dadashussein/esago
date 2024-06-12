import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/features/auth/authSlice";
import Button from "./Button";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


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
      <div className="bg-primary-300 h-[600px] gap-24 flex flex-col rounded-2xl  justify-center items-center w-[500px]">
        <div className="text-[35px] text-center">
          <h1>Esago is your primary CV and Resume maker</h1>
        </div>
        <div className="bg-primary-100 flex h-[212px] rounded-lg  ">
          <div className="flex flex-col items-center w-[200px]   border-r-2 border-gray-300 justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
              <g clipPath="url(#clip0_180_392)">
                <path d="M38.5 5.5H16.5C13.475 5.5 11.0275 7.975 11.0275 11L11 55C11 58.025 13.4475 60.5 16.4725 60.5H49.5C52.525 60.5 55 58.025 55 55V22L38.5 5.5ZM16.5 55V11H35.75V24.75H49.5V55H16.5Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_180_392">
                  <rect width="66" height="66" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1>A lot of templates</h1>
          </div>
          <div className="flex flex-col items-center w-[200px] justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="66" height="66" viewBox="0 0 66 66" fill="none">
              <g clipPath="url(#clip0_180_395)">
                <path d="M42.625 38.5H40.4525L39.6825 37.7575C42.3775 34.6225 44 30.5525 44 26.125C44 16.2525 35.9975 8.25 26.125 8.25C16.2525 8.25 8.25 16.2525 8.25 26.125C8.25 35.9975 16.2525 44 26.125 44C30.5525 44 34.6225 42.3775 37.7575 39.6825L38.5 40.4525V42.625L52.25 56.3475L56.3475 52.25L42.625 38.5ZM26.125 38.5C19.2775 38.5 13.75 32.9725 13.75 26.125C13.75 19.2775 19.2775 13.75 26.125 13.75C32.9725 13.75 38.5 19.2775 38.5 26.125C38.5 32.9725 32.9725 38.5 26.125 38.5Z" fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_180_395">
                  <rect width="66" height="66" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1>
              Filter
              any resume
            </h1>
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center  justify-center  h-[600px] w-[500px] text-gray-600  space-y-8">
        <div className="text-center">
          <div className=" space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Welcome again to Esago CV and resume maker platform
            </h3>
            <p className="">
              Don't have an account?{" "}
              <Link
                to="/signup"
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <form className="flex flex-col " onSubmit={handleSignIn}>
          <div className="mb-2">
            <label className="font-medium" htmlFor="username_or_email">
              Email
            </label>
            <input
              id="username_or_email"
              type="email"
              name="username_or_email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />

            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div className="flex flex-col gap-4">
            <Button
              classname=" inline-block mt-2"
              bgColor="primary-500"
              textColor="white"
            >
              Sign In
            </Button>
            <a href="http://localhost:8000/google/login">Login with google</a>
          </div>
        </form>

        <div className="text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
