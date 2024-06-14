import "./temp6.css";

const Template6 = ({ img, personal, education, experience }) => {
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
    <div className="container">
      <div className="avatar">
        <img src={img} alt="" />
      </div>
      <div className="name">
        <h1>
          {first_name} {last_name}
        </h1>
        <div className="specialize">{job_title}</div>
        <ul className="contact">
          <li>
            <span>P</span> {phone_number}
          </li>
          <li>
            <span>E</span> {email}
          </li>
          <li>
            <span>W</span> lundevweb.com
          </li>
        </ul>
      </div>
      <div className="info">
        <ul>
          <li>From {address}</li>
          <li>01/01/0101</li>
          <li>AAAA University</li>
        </ul>
      </div>
      <div className="intro">
        <h2>INTRODUCE MYSELT</h2>
        {bio}
      </div>
      <div className="experience">
        <h2>EDUCATION</h2>
        {education.map((edu, index) => (
          <div className="item" key={index}>
            <h4>{edu.school_name}</h4>
            <div className="time">
              <span>
                {edu.start_date} - {edu.end_date}
              </span>
              <span>ABC D company</span>
            </div>
            <div className="des">{edu.description}</div>
          </div>
        ))}
        <h2 className="skills">SKILLS</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Bootstrap</li>
          <li>Javascript</li>
          <li>PHP</li>
          <li>MySql</li>
          <li>Git</li>
          <li>Laravel</li>
        </ul>
      </div>
      <div className="project">
        <h2>PROJECTS</h2>
        <div className="item">
          <h4>Website shopping</h4>
          <div className="time">2020</div>
          <div className="web">www.lundevweb.com</div>
          <div className="location">Frond-end Developer</div>
          <div className="des">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            consequatur amet sed, est eum facilis repellendus atque perspiciatis
            iste porro nobis autem explicabo expedita fugiat nostrum. Eveniet
            eum autem culpa!
            <ul>
              <li>Lorem ipsum dolordolores.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequuntur, dolores.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur dolores.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <h4>Website shopping</h4>
          <div className="time">2020</div>
          <div className="web">www.lundevweb.com</div>
          <div className="location">Frond-end Developer</div>
          <div className="des">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            consequatur amet sed, est eum facilis repellendus atque perspiciatis
            iste porro nobis autem explicabo expedita fugiat nostrum. Eveniet
            eum autem culpa!
            <ul>
              <li>Lorem ipsum dolordolores.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequuntur, dolores.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur dolores.</li>
            </ul>
          </div>
        </div>

        <div className="item">
          <h4>Website shopping</h4>
          <div className="time">2020</div>
          <div className="web">www.lundevweb.com</div>
          <div className="location">Frond-end Developer</div>
          <div className="des">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            consequatur amet sed, est eum facilis repellendus atque perspiciatis
            iste porro nobis autem explicabo expedita fugiat nostrum. Eveniet
            eum autem culpa!
            <ul>
              <li>Lorem ipsum dolordolores.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequuntur, dolores.
              </li>
              <li>Lorem ipsum dolor sit amet consectetur dolores.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template6;
