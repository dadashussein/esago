import { createContext, useState } from "react";

export const EducationContext = createContext();
const EducationProvider = ({ children }) => {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [eduLocation, setEduLocation] = useState('');
    const [field, setField] = useState('');
    const [eduStart, setEduStart] = useState('');
    const [eduEnd, setEduEnd] = useState('');
    const [eduDesc, setEduDesc] = useState('');
    const changeSchool = (e) => {
        setSchool(e.target.value);
    };
    const changeDegree = (e) => {
        setDegree(e.target.value);
    };
    const changeField = (e) => {
        setField(e.target.value);
    };
    const changeStart = (e) => {
        setEduStart(e.target.value);
    };
    const changeEnd = (e) => {
        setEduEnd(e.target.value);
    };
    const changeEduDesc = (e) => {
        setEduDesc(e.target.value);
    };
    const changeEduLocation = (e) => {
        setEduLocation(e.target.value);
    };

    return <EducationContext.Provider value={{
        school, changeSchool,
        degree, changeDegree,
        field, changeField,
        eduStart, changeStart,
        eduEnd, changeEnd,
        eduDesc, changeEduDesc,
        eduLocation, changeEduLocation
    }}>{children}</EducationContext.Provider>;
}


export default EducationProvider