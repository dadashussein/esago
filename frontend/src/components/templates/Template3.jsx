import avatar from "../../assets/avatar.jpg";
const Template3 = ({ education, experience, personal, img }) => {
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
    <div className="p-4 bg-white border m-auto">
      {/* header  start*/}

      <div className="border-b-2 flex justify-between p-4">
        <div className="flex items-center gap-4 p-2">
          <img
            className="rounded-full w-32 h-32 object-cover"
            src={avatar}
            alt=""
          />
          <div className="">
            <h1 className="text-4xl">
              {first_name} {last_name}
            </h1>
            <p className="text-gray-500">{job_title}</p>
          </div>
        </div>
        <div className=" flex px-4 flex-col justify-center  text-[11px] text-gray-500">
          <p>{address}</p>
          <p>{phone_number}</p>
          <p>{email}</p>
        </div>
      </div>
      {/* header end */}
      {/* body start */}
      <div className="flex p-4">
        {/* left side */}
        <div className="flex-1 border-r-2 px-2 mt-4">
          <div className="flex flex-col gap-4">
            <h1>Profile</h1>
            <div className="border-b-2"></div>
            <p className=" text-[11px] text-gray-500  break-all whitespace-pre-wrap">
              {bio}
            </p>
          </div>
          {/* education */}
          {education && (
            <div className="flex mt-6 flex-col gap-2 ">
              <h1>Education</h1>
              <div className="border-b-2"></div>
              {education.map((edu, index) => (
                <div key={index} className="flex   gap-4">
                  <div className="flex flex-col text-gray-500">
                    <p className=" text-[10px]">{edu.start_date}</p>
                    <p className="text-[10px]">/</p>
                    <p className=" text-[10px]">{edu.end_date}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center">
                      <h2 className="text-[12px] text-blue-800">
                        {edu.school_name}
                      </h2>
                      <p className="text-[12px] text-gray-500">
                        {edu.location}
                      </p>
                    </div>

                    <p className=" text-[11px] text-gray-500">
                      {edu.field_of_study}
                    </p>
                    <p className="text-[11px] text-gray-500">{edu.degree}</p>
                    <p className="text-[10px] text-gray-500   break-all whitespace-pre-wrap italic">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex mt-6 flex-col gap-2">
            <h1>Key Skills</h1>
            <div className="grid grid-cols-2">
              <div>
                <h2>Frontend</h2>
                <p className="text-sm text-gray-500">React</p>
                <p className="text-sm text-gray-500">Javascript</p>
                <p className="text-sm text-gray-500">HTML</p>
                <p className="text-sm text-gray-500">CSS</p>
                <p className="text-sm text-gray-500">CSS</p>
                <p className="text-sm text-gray-500">CSS</p>
                <p className="text-sm text-gray-500">CSS</p>
              </div>
              <div>
                <h2>Backend</h2>
                <p className=" text-[11px] text-gray-500">Python</p>
                <p className=" text-[11px] text-gray-500">Flask</p>
                <p className=" text-[11px] text-gray-500">Django</p>
                <p className=" text-[11px] text-gray-500">Node</p>
                <p className=" text-[11px] text-gray-500">Node</p>
                <p className=" text-[11px] text-gray-500">Node</p>
                <p className=" text-[11px] text-gray-500">Node</p>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flex-1 mt-4 ml-2">
          <div className="flex flex-col gap-2">
            <h1> Experience</h1>
            {experience.map((exp, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-sm flex text-gray-500">
                  <p className=" text-[11px]">{exp.workStart}</p>
                  <p className="text-[11px]">/</p>
                  <p className=" text-[11px]">{exp.workEnd}</p>
                </div>
                <div>
                  <div>
                    <h2 className="text-[12px]">{exp.company}</h2>
                    <p className="text-[11px] text-blue-500">
                      {exp.companyPlace}
                    </p>
                  </div>
                  <p className=" text-[11px] text-gray-500">{exp.field}</p>
                  <p className="text-[10px] text-gray-500   break-all whitespace-pre-wrap italic">
                    {exp.workDesc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* body end */}
    </div>
  );
};

export default Template3;
