import { useState } from 'react';
import axios from 'axios';
import { compile } from '@fileforge/react-print';

const useCompileHtml = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const compileToHtml = async (component, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const html = await compile(component);
            const options = {
                "method": "POST",
                "url": "https://api.pdfendpoint.com/v1/convert",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer pdfe_live_bae617c9c642e7951d81ff4a458ebe180b5e"
                },
                "data": JSON.stringify({
                    "html": html,
                    "sandbox": true,
                    "orientation": "vertical",
                    "page_size": "A4",
                    "margin_top": "2cm",
                    "margin_bottom": "2cm",
                    "margin_left": "2cm",
                    "margin_right": "2cm",
                })
            };
            const response = await axios(options);
            window.open(response.data.data.url, '_blank');


        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { compileToHtml, loading, error };
};

export default useCompileHtml;
