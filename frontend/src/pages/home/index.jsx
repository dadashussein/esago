import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [errorSign, setErrorSign] = useState(null);
  const [errorReg, setErrorReg] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password, full_name } =
      Object.fromEntries(formData);

    if (!username || !email || !password || !full_name) {
      setErrorReg("All fields are required");
      return;
    }

    const newUser = { username, email, password, full_name };
    try {
      const action = await dispatch(register(newUser));
      const resultAction = unwrapResult(action);

      navigate("/activation");
    } catch (err) {
      setErrorReg(err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username_or_email, password } = Object.fromEntries(formData);

    if (!username_or_email || !password) {
      setErrorSign("Both fields are required");
      return;
    }

    const newUser = { username_or_email, password };
    try {
      const action = await dispatch(login(newUser));
      const resultAction = unwrapResult(action);
      localStorage.setItem("accessToken", resultAction.token);
      navigate("/app");
    } catch (err) {
      setErrorSign(err);
    }
  };
  return (
    <div className="h-full   dark:bg-gray-900">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full  bg-gray-400 dark:bg-gray-800  lg:block lg:w-5/12 bg-cover rounded-l-lg">
              <div className="w-full h-full border-r bg-white dark:bg-gray-700 p-5">
                <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                  Sing in
                </h3>
                <form
                  onSubmit={handleSignIn}
                  className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
                >
                  <div className="mb-4 md:flex md:justify-between"></div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="username_or_email"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="username_or_email"
                      type="email"
                      name="username_or_email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="******************"
                      />
                      <p className="text-xs italic text-red-500">
                        {errorSign && errorSign}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      {isLoading ? (
                        <Oval color="#fff" height={20} width={20} />
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                </form>
              </div>
            </div>
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form
                onSubmit={handleRegister}
                className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="fullName"
                      name="full_name"
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="******************"
                    />
                    <p className="text-xs italic text-red-500">
                      {errorReg && errorReg}
                    </p>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />

                <div className="text-center"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
