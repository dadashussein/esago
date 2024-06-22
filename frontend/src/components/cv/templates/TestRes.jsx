const Resume = ({ img, personal, education, experience, skills }) => {
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl  bg-white  overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">
            {first_name} {last_name}
          </h1>
          <p className="text-sm">{job_title}</p>
        </div>
        <div className="p-6">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600">
              Contact Information
            </h2>
            <ul className="list-none mt-2">
              <li>{email}</li>
              <li>{phone_number}</li>
              <li>{address}</li>
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600">
              Professional Summary
            </h2>
            <p className="mt-2">{bio}</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600">Skills</h2>
            <div className="flex flex-wrap mt-2">
              {skills &&
                skills.length > 0 &&
                skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill.name}
                  </div>
                ))}
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600">
              Work Experience
            </h2>
            {experience &&
              experience.length > 0 &&
              experience.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h3 className="text-xl font-semibold">
                    {exp.job_title} at {exp.company_name}
                  </h3>
                  <p className="text-gray-600">
                    {exp.start_date} - {exp.end_date}
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>{exp.description}</li>
                  </ul>
                </div>
              ))}
          </section>
          <section>
            <h2 className="text-2xl font-bold text-indigo-600">Education</h2>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-gray-600">
                University of Technology, 2014 - 2018
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
