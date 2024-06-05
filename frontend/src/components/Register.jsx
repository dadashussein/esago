import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/features/auth/authSlice";

const Register = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, first_name, last_name } =
      Object.fromEntries(formData);

    if (!username || !email || !password || !first_name || !last_name) {
      setError("All fields are required");
      return;
    }

    const newUser = { username, email, password};
    try {
      const action = await dispatch(register(newUser));
      const resultAction = unwrapResult(action);

    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="font-medium">
                First name
              </label>
              <input
                type="text"
                id="fullName"
                name="first_name"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="font-medium">
                Last name
              </label>
              <input
                type="text"
                id="fullName"
                name="last_name"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Create account
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
