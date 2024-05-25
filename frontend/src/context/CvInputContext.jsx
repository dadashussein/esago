import { createContext, useState } from 'react';

export const CvInputContext = createContext();

// eslint-disable-next-line react/prop-types
const CvInputProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [jobtitle, setJobtitle] = useState('');
    const [adress, setAdress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const changeName = (e) => {
        setName(e.target.value);
    };
    const changeLastname = (e) => {
        setLastname(e.target.value);
    };
    const changeJobtitle = (e) => {
        setJobtitle(e.target.value);
    };
    const changeAdress = (e) => {
        setAdress(e.target.value);
    };
    const changePhone = (e) => {
        setPhone(e.target.value);
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const changeBio = (e) => {
        setBio(e.target.value);
    };
    return <CvInputContext.Provider value={{
        changeName, changeLastname, name, lastname,
        jobtitle, changeJobtitle,
        adress, changeAdress,
        phone, changePhone,
        email, changeEmail,
        bio, changeBio
    }}>{children}</CvInputContext.Provider>;
};
export default CvInputProvider;
