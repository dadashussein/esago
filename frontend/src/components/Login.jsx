import { unwrapResult } from "@reduxjs/toolkit";
import  { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/features/auth/authSlice";

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
      const action = await dispatch(login(newUser));
      const resultAction = unwrapResult(action);
      localStorage.setItem("accessToken", resultAction.token);
      navigate("/app");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="w-fulln h-[30rem] flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-8">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
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
        <form onSubmit={handleSignIn}>
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
          <button className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign in
          </button>
        </form>

        <div className="text-center">
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
