import { useLocation, useNavigate } from 'react-router-dom';

const ActivateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { data } = location.state;

    return (
        <section className='h-screen flex items-center justify-center'>
            <h1>Please go your email and click {data.email}</h1>
            <h2>Activation link has been sent to </h2>
        </section>
    );
}

export default ActivateUser