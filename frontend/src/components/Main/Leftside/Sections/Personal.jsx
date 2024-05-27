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
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Personal Details
      </h2>
      <p className="text-sm leading-6 text-gray-600">
        Get started with the basics: your name and contact information.
      </p>

      <div className="mt-4">
        <label htmlFor="firstname" className="label-primary">
          First Name
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setName(e.target.value))}
          type="text"
          name="firstname"
        />
        <label className="label-primary" htmlFor="lastname">
          Last Name
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setLastname(e.target.value))}
          type="text"
          name="lastname"
        />
        <label className="label-primary" htmlFor="jobtitle">
          Job Title
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setJobtitle(e.target.value))}
          type="text"
          name="jobtitle"
        />
        <label className="label-primary" htmlFor="adress">
          Address
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setAdress(e.target.value))}
          type="text"
          name="adress"
        />
        <label className="label-primary" htmlFor="phone">
          Phone
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setPhone(e.target.value))}
          type="text"
          name="phone"
        />
        <label className="label-primary" htmlFor="email">
          Email
        </label>
        <input
          className="input-primary"
          onChange={(e) => dispatch(setEmail(e.target.value))}
          type="email"
          name="email"
        />
        <label className="label-primary" htmlFor="bio">
          Bio
        </label>
        <textarea
          className="input-primary"
          onChange={(e) => dispatch(setBio(e.target.value))}
          name="bio"
          id="bio"
          placeholder="Write down your bio"
        />
      </div>
    </div>
  );
};

export default Personal;
