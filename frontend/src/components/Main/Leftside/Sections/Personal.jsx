import { useDispatch, useSelector } from "react-redux";
import {
  setPersonalField,
} from "../../../../store/features/personal/personalSlice";
import { useEffect } from "react";

const Personal = ({ setCurrentSection }) => {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal.personal);
  const error = useSelector((state) => state.personal.error);
  console.log(error);
  console.log(personal);

  const handleInputChange = (field, value) => {
    dispatch(setPersonalField({ field, value }));
  };

  const handleSendAndNext = () => {
    const token = localStorage.getItem("accessToken");
    setCurrentSection(1);
    // dispatch(postInfo({ token, personal }));
  };

  return (
    <div className="border-gray-900/10 p-6">
      <h1 className="font-semibold text-[30px] text-gray-900">
        Personal Details
      </h1>
      <p className="text-sm leading-6 text-gray-600">
        Get started with the basics: your name and contact information.
      </p>

      <div className="mt-4 relative grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6 ">
        <div className="sm:col-span-3">
          <label htmlFor="firstname" className="label-primary">
            First Name
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            type="text"
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
            name="address"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="phone_number">
            Phone
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("phone_number", e.target.value)}
            type="text"
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
            placeholder="Write down your bio"
          />
        </div>
        <button
          type="button"
          onClick={handleSendAndNext}
          className="mt-4 bottom-[-50px] bg-gray-500 absolute right-2 text-white p-1 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Personal;
