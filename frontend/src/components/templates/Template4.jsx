

export default function Template4() {
    return (
        <div className="max-w-5xl ">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-[8px] font-bold text-gray-800">DANI <span className="font-light">SCHWAIGER</span></h1>
                        <h2 className="text-[10px] text-gray-600">WEB DEVELOPER</h2>
                    </div>
                    <img src="https://placehold.co/100x100" alt="Profile Picture" className="w-8 h-8 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <ul className="text-gray-600 mb-2">
                            <li className="flex items-center text-[8px] mb-2"><i className="fas fa-phone-alt mr-2"></i> 123-456-7890
                            </li>
                            <li className="flex items-center text-[8px] mb-2"><i className="fas fa-envelope mr-2"></i>
                                hello@reallygreatsite.com</li>
                            <li className="flex items-center text-[8px] mb-2"><i className="fas fa-map-marker-alt mr-2"></i> 123
                                Anywhere St.,
                                Any City</li>
                            <li className="flex items-center text-[8px]"><i className="fas fa-globe mr-2"></i> reallygreatsite.com
                            </li>
                        </ul>
                        <h3 className="text-[12px] font-semibold text-gray-800 mb-2">SKILLS</h3>
                        <ul className="list-disc text-[8px] list-inside text-gray-600">
                            <li>Web Design</li>
                            <li>Design Thinking</li>
                            <li>Wireframe Creation</li>
                            <li>Front End Coding</li>
                            <li>Problem-Solving</li>
                            <li>Computer Literacy</li>
                            <li>Project Management Tools</li>
                            <li>Strong Communication</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[12px] font-semibold text-gray-800 mb-2">PROFILE</h3>
                        <p className="text-gray-600 text-[8px] mb-2">
                            I am a qualified and professional web developer with five years of experience in database
                            administration and website design. Strong creative and analytical skills. Team player with an
                            eye for detail.
                        </p>
                        <h3 className="text-[12px] font-semibold text-gray-800 mb-2">EXPERIENCE</h3>
                        <div className="">
                            <h4 className="text-[8px]  font-semibold text-gray-800">APPLICATIONS DEVELOPER</h4>
                            <p className="text-gray-600 text-[8px] ">Really Great Company<br />2016 - Present</p>
                            <ul className="list-disc list-inside text-[10px]  text-gray-600">
                                <li>Database administration and website design</li>
                                <li>Built the logic for a streamlined ad-serving platform that scaled</li>
                                <li>Educational institutions and online classNameroom management</li>
                            </ul>
                        </div>


                    </div>
                </div>
                <div className="mt-1">
                    <h3 className="text-[12px] font-semibold text-gray-800">EDUCATION</h3>
                    <div className="mb-2">
                        <h4 className="text-[10px] font-semibold text-gray-800">SECONDARY SCHOOL</h4>
                        <p className="text-gray-600 text-[8px]">Really Great High School<br />2010 - 2014</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-semibold text-gray-800">BACHELOR OF TECHNOLOGY</h4>
                        <p className="text-gray-600 text-[8px]">Really Great University<br />2014 - 2016</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
