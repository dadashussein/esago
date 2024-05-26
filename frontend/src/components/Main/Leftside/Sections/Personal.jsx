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
    <div className="personal-container">
      <h1>Personal Details</h1>
      <span>
        Get started with the basics: your name and contact information.
      </span>
      <form>
        <label htmlFor="firstname">First Name</label>
        <input
          onChange={(e) => dispatch(setName(e.target.value))}
          type="text"
          name="firstname"
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          onChange={(e) => dispatch(setLastname(e.target.value))}
          type="text"
          name="lastname"
        />
        <label htmlFor="jobtitle">Job Title</label>
        <input
          onChange={(e) => dispatch(setJobtitle(e.target.value))}
          type="text"
          name="jobtitle"
        />
        <label htmlFor="adress">Address</label>
        <input
          onChange={(e) => dispatch(setAdress(e.target.value))}
          type="text"
          name="adress"
        />
        <label htmlFor="phone">Phone</label>
        <input
          onChange={(e) => dispatch(setPhone(e.target.value))}
          type="text"
          name="phone"
        />
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => dispatch(setEmail(e.target.value))}
          type="email"
          name="email"
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          onChange={(e) => dispatch(setBio(e.target.value))}
          name="bio"
          id="bio"
          placeholder="Write down your bio"
        />
        {/* Uncomment the Link when you have a next page */}
        {/* <Link to="/next-page">
                    <button type="button">Next</button>
                </Link> */}
      </form>
    </div>
  );
};

export default Personal;
