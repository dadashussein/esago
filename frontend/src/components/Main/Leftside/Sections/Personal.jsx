import { useDispatch, useSelector } from "react-redux";
import {
  createCv,
  fetchInfo,
  postInfo,
  setPersonalField,
} from "../../../../store/features/personal/personalSlice";
import { useEffect } from "react";
import { fetchEducation } from "~/store/features/education/educationThunks";

import { unwrapResult } from "@reduxjs/toolkit";

const Personal = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal.personal);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    dispatch(fetchInfo(token));
  }, []);

  const handleInputChange = (field, value) => {
    dispatch(setPersonalField({ field, value }));
  };



  const handleSendAndNext = async () => {
    try {
      const resultAction = await dispatch(postInfo({ info: personal }));
      unwrapResult(resultAction);
      console.log(unwrapResult);
      setActiveTab(1); // Move to the next tab
    } catch (error) {
      console.error('Failed to save personal info: ', error);
    }
  };



  return (
    <div className="border-gray-900/10 p-6 relative">
      <h1 className="font-semibold lg:text-[40px] text-[40px] text-gray-900">
        Personal Details
      </h1>
      <p className="text-sm leading-6 text-gray-600">
        Get started with the basics: your name and contact information.
      </p>

      {personal && (
        <div className="mt-4 relative grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6 ">
          <div className="sm:col-span-3">
            <label htmlFor="title" className="label-primary">
              Title
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("title", e.target.value)}
              type="text"
              value={personal.title}
              name="title"
            />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="firstname" className="label-primary">
              First Name
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              type="text"
              value={personal.first_name}
              name="first_name"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label-primary" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              type="text"
              value={personal.last_name}
              name="last_name"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label-primary" htmlFor="job_title">
              Job Title
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("job_title", e.target.value)}
              type="text"
              value={personal.job_title}
              name="job_title"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label-primary" htmlFor="address">
              Address
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("address", e.target.value)}
              type="text"
              value={personal.address}
              name="address"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label-primary" htmlFor="phone_number">
              Phone
            </label>
            <input
              className="input-primary"
              onChange={(e) =>
                handleInputChange("phone_number", e.target.value)
              }
              type="text"
              value={personal.phone_number}
              name="phone_number"
            />
          </div>
          <div className="sm:col-span-3">
            <label className="label-primary" htmlFor="email">
              Email
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
              value={personal.email}
              name="email"
            />
          </div>
          <div className="col-span-full">
            <label className="label-primary" htmlFor="bio">
              Bio
            </label>
            <textarea
              className="input-primary"
              onChange={(e) => handleInputChange("bio", e.target.value)}
              name="bio"
              id="bio"
              rows={3}
              value={personal.bio}
              placeholder="Write down your bio"
            />
          </div>
          <button
            type="button"
            onClick={handleSendAndNext}
            className="inline-flex py-2 px-6 absolute text-center bottom-[-50px] right-[-10px]    rounded-[20px] bg-primary-500 text-white mt-4"
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
};

export default Personal;
