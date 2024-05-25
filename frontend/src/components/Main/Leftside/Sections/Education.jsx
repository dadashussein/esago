import { useContext } from "react"
import { EducationContext } from "../../../../context/EducationContext"

const Education = () => {
    const { changeSchool,
        changeStart,
        changeEnd,
        changeDegree,
        changeField,
        changeEduDesc,
        changeEduLocation
    } = useContext(EducationContext)
    return (
        <div className=" border-gray-900/10 p-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Education</h2>
            <p className=" text-sm leading-6 text-gray-600">Add your most relevant education, including programs you're currently enrolled in</p>

            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="scholl-name" className="block text-sm font-medium leading-6 text-gray-900">
                        School Name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            onChange={(e) => changeSchool(e)}
                            name="scholl-name"
                            id="scholl-name"
                            autoComplete="given-name"
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="school-location" className="block text-sm font-medium leading-6 text-gray-900">
                        School Location
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="school-location"
                            id="school-location"
                            autoComplete="family-name"
                            onChange={(e) => changeEduLocation(e)}
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                        Start Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="month"
                            name="startDate"
                            id="startDate"
                            onChange={(e) => changeStart(e)}
                            autoComplete="given-name"
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                        End Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="month"
                            name="endDate"
                            id="endDate"
                            onChange={(e) => changeEnd(e)}
                            autoComplete="family-name"
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="degree" className="block text-sm font-medium leading-6 text-gray-900">
                        Degree
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="degree"
                            id="degree"
                            autoComplete="given-name"
                            onChange={(e) => changeDegree(e)}
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="fieldStudy" className="block text-sm font-medium leading-6 text-gray-900">
                        Field of Study
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="fieldStudy"
                            id="fieldStudy"
                            autoComplete="family-name"
                            onChange={(e) => changeField(e)}
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label htmlFor="eduDesc" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="eduDesc"
                            name="eduDesc"
                            placeholder="Coursework, thesis, etc."
                            rows={3}
                            onChange={(e) => changeEduDesc(e)}
                            className="block w-full rounded-md border p-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                            defaultValue={''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Education