import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token');
            } else {
                setUserData({ token, user: decodedToken });
            }
        }
    }, []);



    const login = async (newUser) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/users/login', newUser);
            setUserData(response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            return response.data;
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };



    return (
        <AuthContext.Provider value={{ userData, setUserData, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
