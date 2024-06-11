import React, { useState, useEffect } from 'react';
import Preview from './Preview';

const A4Component = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;


            const a4Width = 210;
            const a4Height = 297;


            const scale = Math.min(
                windowWidth / a4Width,
                windowHeight / a4Height
            );

            setWidth(a4Width * scale);
            setHeight(a4Height * scale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className={`mx-auto border ${width > 0 && height > 0 ? `w-[${width}px] h-[${height}px]` : ''}`}
        >
            <Preview />
        </div>
    );
};

export default A4Component;