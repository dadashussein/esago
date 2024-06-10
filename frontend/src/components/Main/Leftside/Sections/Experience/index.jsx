import useExperience from '~/hooks/useExperience'
import ExperienceForm from './ExperienceForm'
import ExperienceNav from './ExperienceNav'
import { MdDelete } from 'react-icons/md'

const Experience = ({ setActiveTab, cvId }) => {

    const {
        experience,
        currentIndex,
        handleRemoveExperience,
        handleInputChange,
        handleAddExperience,
        setCurrentIndex } = useExperience({ setActiveTab, cvId })

    return (
        <div className="border-gray-900/10 p-6 relative">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold lg:text-[40px] text-[40px] text-gray-900">Experience</h2>
                <div className="col-span-full flex">
                    <button
                        type="button"
                        onClick={handleRemoveExperience}
                        className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear"
                    >
                        <MdDelete size="2rem" />
                    </button>
                </div>
            </div>
            <p className="text-sm leading-6 text-gray-600">
                Add your most relevant work, company programs youre currently work in </p>
            {experience.length > 0 && (
                <>
                    <ExperienceForm
                        currentIndex={currentIndex}
                        experience={experience}
                        handleInputChange={handleInputChange}
                        handleAddExperience={handleAddExperience}
                    />
                    <ExperienceNav
                        currentIndex={currentIndex}
                        experience={experience}
                        setCurrentIndex={setCurrentIndex}
                    />
                </>
            )}
            {/* <button
                type="button"
                onClick={() => setActiveTab(3)}
                className="inline-flex py-2 px-6 absolute text-center bottom-[-50px] right-[-10px] rounded-[20px] bg-primary-500 text-white"
            >
                Next
            </button> */}


        </div>
    )
}

export default Experience