import avatar from "../../assets/avatar.jpg";
const Template2 = ({
  education,
  experience,
  name,
  phone,
  adress,
  email,
  jobtitle,
  lastname,
  bio,
}) => {
  return (
    <div className=" min-w-[320px] bg-white text-gray-800">
      {/* Info */}
      <div className="container mx-auto max-w-screen-lg p-4 lg:p-8">
        <div className="grid grid-cols-1 md:mt-12 md:grid-cols-6">
          {/* Personal */}
          <div className="p-5 text-left md:col-span-2 md:text-right">
            <img
              className="inline-block md:w-2/3"
              src={avatar}
              alt="My portrait"
            />
            <div className="mt-5 space-y-2">
              <p>{adress}</p>
              <p>{phone}</p>
              <p>
                <a
                  className="font-medium text-black underline hover:text-black/75"
                  href="#"
                >
                  {email}
                </a>
              </p>
              <p></p>
            </div>
          </div>
          <div className="p-5 md:col-span-4">
            <h1 className="text-xl font-semibold">{jobtitle}</h1>
            <h2 className="text-5xl font-bold leading-tight">
              {name} {lastname}
            </h2>
            <div className="my-5 h-1 rounded bg-indigo-500"></div>
            <p className="text-lg leading-relaxed text-slate-600">{bio}</p>
          </div>
          {/* END Personal */}
        </div>
      </div>
      {/* END Info */}

      <div className="container mx-auto max-w-screen-lg space-y-10 p-4 lg:p-8">
        {/* Education */}
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="px-5 py-2 text-left md:col-span-2 md:text-right">
            <h3 className="text-lg font-bold uppercase">Education</h3>
          </div>
          <div className="space-y-6 px-5 py-2 md:col-span-4">
            {education.map((edu, index) => (
              <div key={index}>
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  {edu.eduStart} / {edu.eduEnd}
                </h4>
                <h5 className="mb-1 font-bold">
                  {edu.degree}, {edu.school}, {edu.eduLocation}
                </h5>
                <p className="text-indigo-600">{edu.field}</p>
                <p className="leading-relaxed">{edu.eduDesc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* END Education */}
      </div>

      <div className="container mx-auto max-w-screen-lg space-y-10 p-4 lg:p-8">
        {/* Experience */}
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="px-5 py-2 text-left md:col-span-2 md:text-right">
            <h3 className="text-lg font-bold uppercase">Experience</h3>
          </div>
          <div className="space-y-6 px-5 py-2 md:col-span-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                  {exp.workStart} / {exp.workEnd}
                </h4>
                <h5 className="mb-1 font-bold">
                  {exp.company}, {exp.field}, {exp.companyPlace}
                </h5>
                <p className="leading-relaxed">{exp.workDesc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* END Experience */}
      </div>
    </div>
  );
};

export default Template2;
