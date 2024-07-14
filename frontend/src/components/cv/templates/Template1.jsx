import { formatDescriptionAsList } from "@/utils/dangerouslySetInnerHTML";
import { Mail, MapPin, Phone } from "lucide-react";

const Template1 = ({
  personal,
  education,
  experience,
  skills,
  text_size,
  languages,
}) => {
  const {
    first_name,
    last_name,
    job_title,
    address,
    phone_number,
    email,
    bio,
  } = personal;

  const safeTextSize = Math.min(Math.max(text_size, 10), 18);
  const headerSize = safeTextSize + 2;

  return (
    <div
      style={{ fontSize: `${safeTextSize}px` }}
      className={`w-full  h-[70.2rem] 
    ${text_size > 16 ? "text-lg" : "text-base"}
    
    `}
    >
      {/* header */}
      <div className="p-12 border-b-2 flex justify-between bg-gray-100 items-center">
        <div className="flex flex-col">
          <h1 className="text-[30px] ">
            {first_name} <span className="font-bold">{last_name}</span>
          </h1>
          <h1 className="text-[20px]">{job_title}</h1>
        </div>
        <div className="  ">
          <ul className="flex flex-col gap-2  w-full">
            <li className="flex items-center gap-4">
              <span>
                <Phone />
              </span>
              {phone_number}{" "}
            </li>
            <li className="flex items-center gap-4">
              <span>
                <Mail />
              </span>{" "}
              {email}{" "}
            </li>
            <li className="flex items-center gap-4">
              <span>
                <MapPin />
              </span>
              {address}{" "}
            </li>
          </ul>
        </div>
      </div>
      {/* body */}
      <div className="p-8 flex items-center  flex-col gap-8">
        <div className="break-words ">
          <h1
            style={{ fontSize: `${headerSize}px` }}
            className={`uppercase text-[${headerSize}px] text-gray-600 text-center`}
          >
            Summary
          </h1>
          <p className="text-gray-500 w-[30rem] text-wrap text-center ">
            {bio}
          </p>
        </div>
        <div className="flex">
          {/* left */}
          <div className="flex flex-col gap-8 flex-1">
            {education.length > 0 && (
              <div>
                <h1
                  className={`uppercase  text-gray-600  text-[${headerSize}px]`}
                >
                  Education
                </h1>
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
                        <ul className="list-disc pl-4 w-full">
                          {formatDescriptionAsList(edu.description)}
                        </ul>
                        {index !== education.length - 1 && (
                          <hr className="border-gray-400 " />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
            {skills.length > 0 && (
              <div>
                <h1
                  style={{ fontSize: `${headerSize}px` }}
                  className={`uppercase  text-gray-600  text-[${headerSize}px]`}
                >
                  Skills
                </h1>
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
            )}
          </div>
          <div className="inline-block ml-4 w-[.9px] self-stretch bg-gray-400 dark:bg-white/10"></div>

          {/* right */}
          <div className="flex flex-col gap-8 flex-1 pl-8">
            <div>
              {experience.length > 0 && (
                <div>
                  <h1
                    style={{ fontSize: `${headerSize}px` }}
                    className={`uppercase  text-gray-600  text-[${headerSize}px]`}
                  >
                    Experience
                  </h1>
                  <div className="flex flex-col gap-4">
                    {experience &&
                      experience.length > 0 &&
                      experience.map((exp, index) => (
                        <div key={index}>
                          <h1 className="font-bold">
                            {exp.company_name}{" "}
                            <span className="text-blue-500">
                              {exp.location}
                            </span>
                          </h1>
                          <p className="text-gray-600">{exp.job_title}</p>
                          <p className="text-gray-600">
                            {exp.start_date} - {exp.end_date}{" "}
                          </p>
                          <ul className="list-disc pl-4 w-full">
                            {formatDescriptionAsList(exp.description)}
                          </ul>
                          {index !== education.length - 1 && (
                            <hr className="border-gray-400 " />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            {languages.length > 0 && (
              <div>
                <h1
                  style={{ fontSize: `${headerSize}px` }}
                  className={`uppercase  text-gray-600  text-[${headerSize}px]`}
                >
                  Languages
                </h1>
                <div className="flex flex-col mt-4 gap-2">
                  {languages &&
                    languages.length > 0 &&
                    languages.map((lang) => (
                      <div
                        key={lang.id}
                        className="bg-gray-200 flex justify-between gap-8 text-gray-500  px-2 py-1 rounded"
                      >
                        <span>{lang.name}</span>
                        <span>{lang.proficiency}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
