import "./temp5.css";
import avatar from "../../assets/avatar.jpg";
const Template5 = ({ img, personal, education }) => {
  const {
    first_name,
    last_name,
    job_title,
    address,
    phone_number,
    email,
    bio,
  } = personal;
  return (
    <section className="temp5">
      <div className="container">
        <div className="leftSide">
          <div className="profileText">
            <div className="imgBx">
              <img src={(img && img) || avatar} alt="" />
            </div>
            <h2>{first_name}</h2>
            <h2>{last_name}</h2>
          </div>
          <div className="contactInfo">
            <h3 className="title">Contact Info</h3>
            <ul>
              <li>
                <span className="icon"></span>
                <span className="text">{phone_number}</span>
              </li>
              <li>
                <span className="icon"></span>
                <span className="text">{email}</span>
              </li>
              <li>
                <span className="icon"></span>
                <span className="text">{address}</span>
              </li>
            </ul>
          </div>
          <div className="education">
            <h3 className="title">Education</h3>
            <ul>
              {education &&
                education.length > 0 &&
                education.map((edu, index) => (
                  <li key={index}>
                    <h5>
                      {edu.start_date} / {edu.end_date}
                    </h5>
                    <h4>{edu.degree}</h4>
                    <h4>{edu.school_name}</h4>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="rightSide"></div>
      </div>
    </section>
  );
};

export default Template5;
