import { Mail, MapPin, Phone } from "lucide-react";

const Template7 = ({ img, personal, education, experience, skills }) => {
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
    <div className="w-full bg-white border">
      {/* header */}
      <div className="p-12 border-b-2 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[30px]">
            {first_name} <span className="font-bold">{last_name}</span>
          </h1>
          <h1>{job_title}</h1>
        </div>
        <div>
          <ul>
            <li className="flex items-center gap-4">
              {phone_number}{" "}
              <span>
                <Phone />
              </span>
            </li>
            <li className="flex items-center gap-4">
              {email}{" "}
              <span>
                <Mail />
              </span>{" "}
            </li>
            <li className="flex items-center gap-4">
              {address}{" "}
              <span>
                <MapPin />
              </span>
            </li>
          </ul>
        </div>
      </div>
      {/* body */}
      <div className="p-12 flex  flex-col gap-8">
        <div className="">
          <h1 className="uppercase text-[25px] text-gray-600 text-center">
            Summary
          </h1>
          <p className="text-gray-500 text-center ">{bio}</p>
        </div>
        <div className="flex">
          {/* left */}
          <div className="flex flex-col gap-8 flex-1">
            <div>
              <h1 className="uppercase text-[20px] text-gray-600">Education</h1>
              <div className="flex flex-col gap-4">
                {education &&
                  education.length > 0 &&
                  education.map((edu, index) => (
                    <div key={index}>
                      <h1 className="font-bold">
                        {edu.school_name}{" "}
                        <span className="text-blue-500">{edu.location}</span>
                      </h1>
                      <p className="text-gray-600">{edu.degree}</p>
                      <p className="text-gray-600">
                        {edu.start_date} - {edu.end_date}{" "}
                      </p>
                      {index !== education.length - 1 && (
                        <hr className="border-gray-400 " />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h1 className="uppercase text-[20px]  text-gray-600">Skills</h1>
              <div className="flex flex-wrap mt-4 gap-2">
                {skills &&
                  skills.length > 0 &&
                  skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-gray-200 text-gray-500  px-2 py-1 rounded"
                    >
                      {skill.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="inline-block ml-4 w-[.9px] self-stretch bg-gray-400 dark:bg-white/10"></div>
          {/* right */}
          <div className="flex flex-col gap-8 flex-1 pl-8">
            <div>
              <h1 className="uppercase text-[20px] text-gray-600">
                Experience
              </h1>
              <div className="flex flex-col gap-4">
                {experience &&
                  experience.length > 0 &&
                  experience.map((exp, index) => (
                    <div key={index}>
                      <h1 className="font-bold">
                        {exp.company_name}{" "}
                        <span className="text-blue-500">{exp.location}</span>
                      </h1>
                      <p className="text-gray-600">{exp.job_title}</p>
                      <p className="text-gray-600">
                        {exp.start_date} - {exp.end_date}{" "}
                      </p>
                      {index !== education.length - 1 && (
                        <hr className="border-gray-400 " />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template7;
