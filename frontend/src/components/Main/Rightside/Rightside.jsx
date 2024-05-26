import Template2 from "../../templates/Template2";
import { useSelector } from "react-redux";

const Rightside = () => {
  const { name, lastname, jobtitle, adress, phone, email, bio } = useSelector(
    (state) => state.personal
  );
  const { school, degree, eduLocation, field, eduStart, eduEnd, eduDesc } =
    useSelector((state) => state.education);
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
        school={school}
        degree={degree}
        eduLocation={eduLocation}
        field={field}
        eduStart={eduStart}
        eduEnd={eduEnd}
        eduDesc={eduDesc}
      />
    </div>
  );
};

export default Rightside;
