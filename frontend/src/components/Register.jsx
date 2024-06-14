import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../store/features/auth/authSlice";
import sekil from "../assets/avata.png";

const Register = () => {
  const [error, setError] = useState(null);
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const newUser = { username, email, password };
    try {
      const action = await dispatch(register(newUser));
      const resultAction = unwrapResult(action);
      const data = resultAction;
      console.log("account created");
      navigate("/activate", { state: { data } });
    } catch (err) {
      setError(err);
    }
  };

  // const handleAvatarUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('file', avatar.file);

  //   try {
  //     const response = await fetch('http://127.0.0.1:8000/users/changepicture', {
  //       method: 'PATCH',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload avatar');
  //     }

  //     console.log('Avatar uploaded successfully');
  //   } catch (err) {
  //     setError(err.message || 'Avatar upload failed');
  //   }
  // };

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <section
      className="ml-auto mr-auto bg-[#EFF2F9] 
     dark:bg-[#1C1C1E] dark:text-white
      h-screen flex flex-col items-center justify-center"
    >
      <div
        className="flex flex-col dark:border-[#686D76] w-[30rem] px-8 py-4 items-center  border justify-center 
        text-gray-600  space-y-8"
      >
        <div className="mt-5 space-y-2">
          <h3 className="text-gray-800 dark:text-white text-2xl font-bold sm:text-3xl">
            Create an account
          </h3>
          <p className="text-gray-800 dark:text-white">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-primary-500 hover:text-indigo-500"
            >
              Log in
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col w-[80%] ml-auto mr-auto"
        >
          <div className="mb-2">
            <label
              htmlFor="username"
              className="font-medium dark:text-[#D4D4D4]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full mt-2 px-3 py-2 input-primary"
            />
          </div>

          <div>
            <label className="font-medium dark:text-[#D4D4D4]">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full mt-2 px-3 py-2 input-primary"
            />
          </div>
          <div>
            <label className="font-medium dark:text-[#D4D4D4]">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full mt-2 px-3 py-2 input-primary"
            />
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="font-medium  flex items-center gap-4"
            >
              <img
                className="w-16 h-16 object-contain rounded  -xl"
                src={avatar.url || sekil}
                alt="avatar"
              />
              <p>Upload an image</p>
            </label>
            <input
              id="avatar"
              type="file"
              style={{ display: "none" }}
              name="avatar"
              onChange={handleAvatar}
              className=" mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
            {error && <div className="text-red-500">{error}</div>}
          </div>
          <button className="button-primary mt-4 ">Create account</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
