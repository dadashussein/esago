import React from 'react';

const AveryTemp = ({ img, personal, education, experience }) => {
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
        <div className="bg-white text-gray-800 font-sans antialiased py-8 max-w-2xl mx-auto">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold text-purple-700">{first_name} {last_name}</h1>
                <p className="text-base text-gray-600 mt-4">
                    {address} • {phone_number} • {email}
                </p>
            </header>

            {/* Summary */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 border-b-2 border-gray-300 mb-4">SUMMARY</h2>
                <p className="text-base leading-relaxed">
                    {bio}
                </p>
            </section>

            {/* Work Experience */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 border-b-2 border-gray-300 mb-4">WORK EXPERIENCE</h2>

                {experience && experience.map((exp, index) => (
                    <div className="mb-4" key={index}>
                        <div className='flex justify-between items-center'>
                            <h3 className="text-lg font-semibold">{exp.job_title}, {exp.company_name} </h3>
                            <span className="text-md text-gray-500">{exp.start_date} - {exp.end_date}</span>
                        </div>

                        <ul className="leading-relaxed list-disc list-inside text-base mt-2">
                            <li>{exp.description}</li>
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education */}
            <section className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 border-b-2 border-gray-300 mb-4">EDUCATION</h2>
                {education && education.map((edu, index) => (
                    <div className="mb-4" key={index}>
                        <div className='flex'>
                            <h3 className="text-lg font-semibold">{edu.degree} in {edu.field_of_study}</h3>
                            <span className="text-sm text-gray-500">{edu.start_date} - {edu.end_date}</span>
                        </div>
                        <p className="text-base">{edu.school_name}</p>
                        <p className="text-base">{edu.description}</p>

                    </div>
                ))}
            </section>

            {/* Additional Information */}
            <section>
                <h2 className="text-xl font-bold text-purple-600 border-b-2 border-gray-300 mb-4">ADDITIONAL INFORMATION</h2>
                <ul className="list-disc list-inside text-base">
                    <li>Technical Skills: Project Management, Structural Analysis, Robotics and Automation, CAD</li>
                    <li>Languages: English, Malay, German</li>
                    <li>Certifications: Professional Engineer (PE) License, Project Management Professional (PMP)</li>
                    <li>Awards/Activities: Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies</li>
                </ul>
            </section>
        </div>
    );
};

export default AveryTemp;
