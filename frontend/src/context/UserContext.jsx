import { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    


    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}


export default UserContextProvider