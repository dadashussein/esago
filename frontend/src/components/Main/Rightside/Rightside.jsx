import { useContext } from "react"
import { CvInputContext } from "../../../context/CvInputContext"
import Template2 from "../../templates/Template2"
import { EducationContext } from "../../../context/EducationContext"

const Rightside = () => {
    const { name, lastname, jobtitle, adress, phone, email, bio } = useContext(CvInputContext)
    const {
        school,
        degree,
        eduLocation,
        field,
        eduStart,
        eduEnd,
        eduDesc
    } = useContext(EducationContext)
    return (
        <div className="rightside">
            <Template2 name={name}
                lastname={lastname}
                jobtitle={jobtitle}
                adress={adress}
                phone={phone}
                email={email}
                bio={bio}
                school={school}
                degree={degree}
                eduLocation={eduLocation}
                field={field}
                eduStart={eduStart}
                eduEnd={eduEnd}
                eduDesc={eduDesc}
            />
        </div>

    )
}

export default Rightside