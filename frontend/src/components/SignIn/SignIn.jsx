import { useContext, useState } from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { username_or_email, password } = Object.fromEntries(formData);
        const newUser = { username_or_email, password };

        try {
            await login(newUser);
            setLoading(false);
            navigate('/app');
        } catch (error) {
            console.log(error.response.data);
            setLoading(false);
        }
    };

    return (
        <div className='signin'>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">Email</label>
                <input type="email" name="username_or_email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
            </form>
        </div>
    );
}

export default SignIn;
