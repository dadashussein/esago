
import { CircleCheckIcon } from '@/Icons';
import { CircleAlertIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomToast = ({ message, type, detail }) => {
    return (
        <div className="bg-white">
            <div>{type === 'success' ? <CircleCheckIcon /> : <CircleAlertIcon />}</div>
            <div className="md:mt-2 mt-1 font-bold">{message}</div>
            <div className="md:mt-2 mt-1">{detail}</div>
        </div>
    );
};

export const showToast = (message, type = 'info', detail) => {
    toast(<CustomToast message={message} type={type} detail={detail} />, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
};

export default CustomToast;