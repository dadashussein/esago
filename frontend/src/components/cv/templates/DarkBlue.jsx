import { MapPin } from "lucide-react";
import { Mail } from "lucide-react";
import { Smartphone } from "lucide-react";
const DarkBlue = ({ education, experience, personal, img, skills, languages }) => {
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
    <div className="flex w-full h-[70.2rem] bg-slate-50">
      {/* leftbar */}
      <div className="basis-2/6 bg-cyan-700 ">
        {/* leftbar - head */}
        <div
          className={`bg-neutral-800 px-8  h-32 ${img && !img.endsWith("/null") ? "block" : "hidden"}`}
        >
          <img
            className="relative top-8 border-2 border-cyan-700 w-full"
            src={img}
            alt=""
          />
        </div>
        {/* leftbar-body */}
        <div
          className={`px-8 text-cyan-100 ${img && img.endsWith("/null") ? "mt-20" : "mt-32"}  text-xs`}
        >
          {/* Address */}
          <div className="pb-6 mb-2 border-solid border-b-2 border-b-cyan-100">
            <div className="flex items-center gap-3 mb-1.5">
              <MapPin className="size-3" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-3 mb-1.5">
              <Smartphone className="size-3" />
              <span>{phone_number}</span>
            </div>
            <div className="flex items-end gap-3">
              <Mail className="size-3" />
              <span>{email}</span>
            </div>
          </div>
          {/* Summary */}
          <div className="pb-6 mb-2 border-solid border-b-2 border-b-cyan-100">
            <h3 className="uppercase font-bold text-base mb-1 tracking-wide">
              Summary
            </h3>
            <p className="">{bio}</p>
          </div>
          {/* Skills */}
          <div>
            <h3 className="uppercase font-bold text-base mb-1 tracking-wide">
              Skills
            </h3>
            {skills &&
              skills.map((skill, index) => (
                <ul className="list-disc list-inside" key={index}>
                  <li>{skill.name}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
      {/* rightbar */}
      <div className="px-8 pt-10 w-4/6  text-xs">
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-cyan-600">
            {first_name} {last_name}
          </h1>

          <h2 className="text-2xl mt-8 font-semibold text-cyan-600">
            {job_title}
          </h2>
        </div>
        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-14 pt-1 border border-x-0 border-b-0 border-cyan-600">
            <h3 className="tracking-wide font-medium uppercase text-base mb-2">
              Experience
            </h3>
            {/* experience body */}

            {experience.map((exp, index) => (
              <div className="mb-5" key={index}>
                <div>
                  <span>{exp.start_date}</span> - <span>{exp.end_date}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium">{exp.job_title}</span> |{" "}
                  <span>{exp.company_name}</span>
                </div>
                <ul className="list-disc pl-4">
                  <li>{exp.description}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
        {/* Education */}
        {education.length > 0 && (
          <div className="mb-14 pt-1 border border-x-0 border-b-0 border-cyan-600">
            <h3 className="tracking-wide font-medium uppercase text-base mb-2">
              Education and training
            </h3>
            {education.map((edu, index) => (
              <div key={index}>
                <div>
                  <span>{edu.start_date}</span> - <span>{edu.end_date}</span>
                </div>
                <div className="">
                  <span className="capitalize">{edu.school_name}</span>,{" "}
                  <span className="capitalize">{edu.location}</span>
                </div>
                <div className="font-medium mb-2">
                  <span className="capitalize">{edu.degree}</span> of{" "}
                  <span className="capitalize">{edu.field_of_study}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-14 pt-1 border border-x-0 border-b-0 border-cyan-600">
            <h3 className="tracking-wide font-medium uppercase text-base">
              Languages
            </h3>
            <div>
              {languages && languages.map((language, index) => (
                <div key={index} className="mb-2">
                  <span>{language.name}</span> - <span>{language.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DarkBlue;
