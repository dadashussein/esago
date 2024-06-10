import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => handleLoginSuccess(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    const handleLoginSuccess = async (response) => {
        const { code } = response;
        try {
            const userInfoResponse = await axios.get(`http://localhost:8000/auth?code=${code}`);
            setProfile(userInfoResponse.data);
        } catch (error) {
            console.log('Error fetching user info:', error);
        }
    };

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <p>Welcome, {profile.name}</p>
                    <button onClick={logOut}>Log Out</button>
                </div>
            ) : (
                <GoogleLogin login_uri='http://localhost:8000/login' onSuccess={login} onError={(error) => console.log('Login Failed:', error)} />
            )}
        </div>
    );
}

export default App;
