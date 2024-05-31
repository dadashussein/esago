import { useDispatch, useSelector } from "react-redux";
import { setPersonalField } from "../../../../store/features/personal/personalSlice";

const Personal = ({ setCurrentSection }) => {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal.personal);

  const handleInputChange = (field, value) => {
    dispatch(setPersonalField({ field, value }));
  };

  const handleSendAndNext = () => {
    setCurrentSection(1);
    // send to backend
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
            onChange={(e) => handleInputChange("name", e.target.value)}
            type="text"
            name="firstname"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            type="text"
            name="lastname"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="jobtitle">
            Job Title
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("jobtitle", e.target.value)}
            type="text"
            name="jobtitle"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="adress">
            Address
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("address", e.target.value)}
            type="text"
            name="adress"
          />
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="phone">
            Phone
          </label>
          <input
            className="input-primary"
            onChange={(e) => handleInputChange("phone", e.target.value)}
            type="text"
            name="phone"
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
