import { createContext, useState } from "react";

export const SignUpContext = createContext();

// eslint-disable-next-line react/prop-types
const ShowUpProvider = ({ children }) => {
    const [showSignUp, setShowSignUp] = useState(false);

    const handleShowSignUp = () => {
        setShowSignUp(!showSignUp);
    }
    return <SignUpContext.Provider value={{ showSignUp, handleShowSignUp }}>{children}</SignUpContext.Provider>;
}


export default ShowUpProvider