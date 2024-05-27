import { useDispatch } from "react-redux";
import {
  setName,
  setLastname,
  setJobtitle,
  setAdress,
  setPhone,
  setEmail,
  setBio,
} from "../../../../store/features/personal/personalSlice";

const Personal = () => {
  const dispatch = useDispatch();

  return (
    <div className="border-gray-900/10 p-6">
      <h1 className="font-semibold text-[30px] text-gray-900">
        Personal Details
      </h1>
      <p className="text-sm leading-6 text-gray-600">
        Get started with the basics: your name and contact information.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6 ">
        <div className="sm:col-span-3">
          <label htmlFor="firstname" className="label-primary">
            First Name
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setName(e.target.value))}
              type="text"
              name="firstname"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="lastname">
            Last Name
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setLastname(e.target.value))}
              type="text"
              name="lastname"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="jobtitle">
            Job Title
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setJobtitle(e.target.value))}
              type="text"
              name="jobtitle"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="adress">
            Address
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setAdress(e.target.value))}
              type="text"
              name="adress"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="phone">
            Phone
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setPhone(e.target.value))}
              type="text"
              name="phone"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label className="label-primary" htmlFor="email">
            Email
          </label>
          <div className="mt-2">
            <input
              className="input-primary"
              onChange={(e) => dispatch(setEmail(e.target.value))}
              type="email"
              name="email"
            />
          </div>
        </div>
        <div className="col-span-full">
          <label className="label-primary" htmlFor="bio">
            Bio
          </label>
          <div className="mt-2">
            <textarea
              className="input-primary"
              onChange={(e) => dispatch(setBio(e.target.value))}
              name="bio"
              id="bio"
              rows={3}
              placeholder="Write down your bio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
