import avatar from "../../assets/avatar.jpg"

const Template2 = ({ name,
    lastname,
    jobtitle,
    adress,
    phone,
    email,
    bio,
    school,
    degree,
    eduLocation,
    field,
    eduStart,
    eduEnd,
    eduDesc
}) => {

    return (
        <div className="min-h-dvh min-w-[320px] bg-white text-gray-800">
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
                                    href="javascript:void(0)"
                                >
                                    {email}
                                </a>
                            </p>
                            <p>
                            </p>
                        </div>
                    </div>
                    <div className="p-5 md:col-span-4">
                        <h1 className="text-xl font-semibold">{jobtitle}</h1>
                        <h2 className="text-5xl font-bold leading-tight">{name} {lastname}</h2>
                        <div className="my-5 h-1 rounded bg-indigo-500"></div>
                        <p className="text-lg leading-relaxed text-slate-600">
                            {bio}
                        </p>
                    </div>
                    {/* END Personal */}
                </div>
            </div>
            {/* END Info */}

            {/* Bio */}
            <div className="container mx-auto max-w-screen-lg space-y-10 p-4 lg:p-8">
                {/* Education */}
                <div className="grid grid-cols-1 md:grid-cols-6">
                    <div className="px-5 py-2 text-left md:col-span-2 md:text-right">
                        <h3 className="text-lg font-bold uppercase">Education</h3>
                    </div>
                    <div className="space-y-6 px-5 py-2 md:col-span-4">
                        <div>
                            <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                                {eduStart} / {eduEnd}
                            </h4>
                            <h5 className="mb-1 font-bold">
                                {degree}, {school}, {eduLocation}
                            </h5>
                            <p className="leading-relaxed">
                                {eduDesc}
                            </p>
                        </div>
                        {/* <div>
                            <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                                2005-2007
                            </h4>
                            <h5 className="mb-1 font-bold">
                                Master in Computer Science, University NY, USA
                            </h5>
                            <p className="leading-relaxed">
                                I further honed my skills by pursuing a Master's degree in
                                Computer Science, delving deeper into advanced concepts and
                                emerging technologies to elevate my proficiency in web
                                development at New York University.
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-2 text-lg font-semibold text-indigo-700">
                                2007-2009
                            </h4>
                            <h5 className="mb-1 font-bold">
                                Professional Studies in Web Development, NY, USA
                            </h5>
                            <p className="leading-relaxed">
                                My journey continued with Professional Studies in Web
                                Development, where I delved into specialized courses, refining
                                my expertise and staying abreast of the latest industry trends
                                to excel in the dynamic world of web development.
                            </p>
                        </div> */}
                    </div>
                </div>
                {/* END Education */}
            </div>
            {/* END Bio */}
        </div>
    )
}

export default Template2