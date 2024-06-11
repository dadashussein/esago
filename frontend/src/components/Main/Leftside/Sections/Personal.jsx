import { useDispatch, useSelector } from "react-redux";
import {
  fetchInfo,
  patchPhoto,
  postInfo,
  setPersonalField,
} from "../../../../store/features/personal/personalSlice";
import sekil from "../../../../assets/avata.png"

import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

const Personal = ({ setActiveTab, cvId }) => {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal.personal);
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  })

  const handleInputChange = (field, value) => {
    dispatch(setPersonalField({ field, value }));
  };



  const handleSendAndNext = async () => {
    try {
      const resultAction = await dispatch(postInfo({ info: personal, cvId }));
      unwrapResult(resultAction);
      setActiveTab(1);
    } catch (error) {
      console.error("Failed to save personal info: ", error);
    }
  };

  useEffect(() => {
    dispatch(fetchInfo(cvId));
  }, [dispatch, cvId]);

  const handleAvatar = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar({
        file: file,
        url: URL.createObjectURL(file)
      });

      dispatch(patchPhoto({ cvId, file }));
    }
  }



  return (
    <div className="border-gray-900/10  relative">
      <h1 className="section-title ">
        Personal Details
      </h1>
      <p className="section-description">
        Get started with the basics: your name and contact information.
      </p>

      {personal && (
        <div className="mt-4 relative grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6 ">
          <div className="sm:col-span-3">
            <label htmlFor="firstname" className="label-primary">
              First Name
            </label>
            <input
              className="input-primary"
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              type="text"
              value={personal?.first_name || ""}
              name="first_name"
            />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="avatar" className="flex label-primary items-center">
              <img className="w-12 h-12 object-contain rounded  -xl" src={avatar.url || sekil} alt="avatar" />
              <p>Upload an image</p>
            </label>
            <input
              id="avatar"
              type="file"
              style={{ display: "none" }}
              name="avatar"
              onChange={handleAvatar}
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
              value={personal?.last_name || ""}
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
              value={personal?.job_title || ""}
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
              value={personal?.address || ""}
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
              value={personal?.phone_number || ""}
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
              value={personal?.email || ""}
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
              value={personal?.bio || ""}
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
