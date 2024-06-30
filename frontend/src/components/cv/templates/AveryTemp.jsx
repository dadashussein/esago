import { formatDescriptionAsList } from "@/utils/dangerouslySetInnerHTML";
import { chunkArray } from "@/utils/forCvTemplate";
import { Mail } from "lucide-react";
import { Github } from "lucide-react";
import { Phone } from "lucide-react";
import { MapPin } from "lucide-react";

const AveryTemp = ({ img, personal, education, experience, skills }) => {
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
    <div className="overflow-hidden ">
      <div className="flex w-full min-h-full bg-slate-50 text-stone-700 pb-8">
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
              <div className="mb-5">
                <div className="font-medium mb-1">
                  <span className="capitalize">Master</span> of{" "}
                  <span className="capitalize">
                    Computer sience and low level programming
                  </span>
                </div>
                <div className="">
                  <span className="capitalize">Holberton School</span>,{" "}
                  <span className="capitalize">San Francisco, USA</span>
                </div>
                <div>
                  <span>September 2011</span> - <span>May 2015</span>
                </div>
              </div>
              <div>
                <div className="font-medium mb-1">
                  <span className="capitalize">Master</span> of{" "}
                  <span className="capitalize">
                    Computer sience and low level programming
                  </span>
                </div>
                <div className="">
                  <span className="capitalize">Holberton School</span>,{" "}
                  <span className="capitalize">San Francisco, USA</span>
                </div>
                <div>
                  <span>September 2011</span> - <span>May 2015</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* rightbar */}
        <div className="pt-8 w-4/6  text-xs">
          <div className="pr-0.5  mb-2">
            <h1 className="pl-8 pt-2 bg-red-900 min-h-16 text-3xl font-bold text-slate-50">
              Yashar Heydarov
            </h1>
            <div className="h-3 bg-stone-900"></div>
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
            {/* {
              skills.length > 0 && (
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
            } */}
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
            {/* Projects */}
            <div className="mb-2">
              <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                Portfolio Project
              </h3>
              {/* experience body */}
              <div className="mb-5">
                <h4 className="font-medium leading-none text-sm mb-2">
                  CV maker app
                </h4>
                <div className="flex align-end mb-3 italic">
                  <span className="pr-2 border-r border-stone-400 mr-2 leading-none text-xs underline">
                    <a href="#">See on Github</a>
                  </span>
                  <span className="pr-2 mr-2 leading-none text-xs">
                    June 2024
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-medium">Tech stack:</span> React,
                  Tailwind, Python, PostgreSQL
                </div>
                <div>
                  <p className="font-medium">Functionalities:</p>
                  <ul className="list-disc pl-4 w-full">
                    <li>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Est repudiandae praesentium ex
                    </li>
                    <li>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Est repudiandae praesentium ex
                    </li>
                    <li>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Est repudiandae praesentium ex
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="uppercase font-medium text-base tracking-wide leading-none pb-1.5 mb-2 border-b border-stone-400">
                Languages
              </h3>
              {/* language body */}
              <div className="mb-3">
                <span className="font-medium">Azerbaijani</span>:{" "}
                <span>Native</span>
              </div>
              <div className="flex flex-wrap justify-between gap-5">
                <div className="flex flex-col basis-2/5">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">English:</span>
                    <span>Beginner</span>
                  </div>
                  <span className="bg-stone-200 w-full h-1 relative">
                    <span className="bg-red-950 w-1/6 h-1 absolute"></span>
                  </span>
                </div>
                <div className="flex flex-col basis-2/5">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Spanish:</span>
                    <span>Intermediate</span>
                  </div>
                  <span className="bg-stone-200 w-full h-1 relative">
                    <span className="bg-red-950 w-3/6 h-1 absolute"></span>
                  </span>
                </div>
                <div className="flex flex-col basis-2/5">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Russian:</span>
                    <span>Intermediate</span>
                  </div>
                  <span className="bg-stone-200 w-full h-1 relative">
                    <span className="bg-red-950 w-3/6 h-1 absolute"></span>
                  </span>
                </div>
                <div className="flex flex-col basis-2/5">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Turkish:</span>
                    <span>Upper Intermediate</span>
                  </div>
                  <span className="bg-stone-200 w-full h-1 relative">
                    <span className="bg-red-950 w-5/6 h-1 absolute"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AveryTemp;
