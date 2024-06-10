import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchWithAuth = async (url, options = {}) => {
    const accessToken = Cookies.get('accessToken');
    const response = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'An error occurred while making the request');
    }

    return response.json();
};

export default fetchWithAuth;