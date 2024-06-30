import { formatDescriptionAsList } from "@/utils/dangerouslySetInnerHTML";
import { chunkArray } from "@/utils/forCvTemplate";
import { Mail } from "lucide-react";
import { Github } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";

const AveryTemp = ({ img, personal, education, experience, skills, languages }) => {
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
    <div className="overflow-hidden bg-slate-50 h-[70.2rem]">
      <div className="flex w-full   text-stone-700 pb-8">
        {/* leftbar */}
        <div className="basis-2/6 pt-8 pl-10 pr-1">
          {/* leftbar - head */}
          <div
            className={`mb-2  ${img && !img.endsWith("/null") ? "block" : "hidden"}`}
          >
            <img
              className="max-w-full border border-red-900 w-full"
              src={img}
              alt=""
            />
          </div>
          {/* leftbar-body */}
          <div className={`${img && img.endsWith("/null") ? "mt-20" : "mt-8"}`}>
            {/* Address */}
            <div className="mb-2 border-t border-b border-stone-400">
              <div className="flex items-center gap-3 border-b border-stone-400">
                <MapPin size={".9rem"} />
                <span>{address}{" "}</span>
              </div>
              <div className="flex items-center gap-3 border-b border-stone-400">
                <Phone size={".9rem"} />

                <span>{phone_number}{" "}</span>
              </div>
              <div className="flex items-center gap-3 border-b border-stone-400">
                <Mail size={".9rem"} />
                <span>{email}{" "}</span>
              </div>
              <div className="flex items-center gap-3">
                <Github size={".9rem"} />
                <span>github/heydarov93</span>
              </div>
            </div>
            {/* Education */}
            <div className="mb-14">
              <h3 className="tracking-wide font-medium uppercase text-base mb-2 pb-2 leading-none border-b border-stone-400">
                Education and training
              </h3>
              {education.map((edu) => (
                <div className="mb-5" key={edu.id}>
                  <div className="font-medium mb-1">
                    <span className="capitalize">{edu.degree}</span> of{" "}
                    <span className="capitalize">
                      {edu.field_of_study}
                    </span>
                  </div>
                  <div className="">
                    <span className="capitalize">{edu.school_name}</span>,{" "}
                    <span className="capitalize">{edu.location}</span>
                  </div>
                  <div>
                    <span>{edu.start_date}</span> - <span>{edu.end_date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* rightbar */}
        <div className="pt-8 w-4/6  text-xs">
          <div className="pr-0.5  mb-2">
            <div className="pl-8 pt-2 flex flex-col bg-blue-400 min-h-32 text-3xl font-bold text-slate-50">
              <h1>{first_name} {last_name}</h1>
              <span className="mt-4">{job_title}</span>
            </div>
            <div className="h-3">

            </div>
          </div>
          {/* Summary */}
          <div className="pl-8 pr-10">
            {
              bio && (
                <div className="mb-2">
                  <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                    Summary
                  </h3>
                  <p className="">
                    {bio}
                  </p>
                </div>)
            }
            {/* Skills */}
            {
              skills && (
                <div className="mb-2">
                  <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                    Skills
                  </h3>
                  <div className="flex justify-start flex-wrap">
                    {chunkArray(skills, 5).map((skillChunk, index) => (
                      <ul key={index} className="list-disc list-inside basis-1/2">
                        {skillChunk.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              )
            }
            {/* Experience */}
            {
              experience.length > 0 && (
                <div className="mb-2">
                  <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                    Experience
                  </h3>
                  {/* experience body */}
                  {
                    experience.map((exp, index) => (
                      <div className="mb-2" key={index}>
                        <h4 className="font-medium leading-none text-sm mb-2">
                          {exp.job_title}
                        </h4>
                        <div className="flex align-end mb-3 italic">
                          <span className="pr-2 border-r border-stone-400 mr-2 leading-none text-xs">
                            {exp.company_name}
                          </span>
                          <div className="pr-2 mr-2 leading-none text-xs">
                            <span>{exp.start_date}</span> - <span>{exp.end_date}</span>
                          </div>
                        </div>
                        <ul className="list-disc pl-4 w-full">
                          {formatDescriptionAsList(exp.description)}
                        </ul>
                      </div>))
                  }
                </div>
              )
            }
            <div className="mb-2">
              <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                Languages
              </h3>
              {/* language body */}
              {
                languages.map((language) => (
                  <div className="mb-3 flex justify-between" key={language.id}>
                    <span className="font-medium">{language.name}</span>:{" "}
                    <span>{language.profiency}</span>
                  </div>
                ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AveryTemp;
