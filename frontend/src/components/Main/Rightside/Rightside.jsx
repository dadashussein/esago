import Template2 from "../../templates/Template2";
import { useSelector } from "react-redux";

const Rightside = () => {
  const { name, lastname, jobtitle, adress, phone, email, bio } = useSelector(
    (state) => state.personal
  );
  const education = useSelector((state) => state.education.education);
  return (
    <div className="rightside">
      <Template2
        name={name}
        lastname={lastname}
        jobtitle={jobtitle}
        adress={adress}
        phone={phone}
        email={email}
        bio={bio}
        education={education}
      />
    </div>
  );
};

export default Rightside;
