import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCv } from '~/store/features/personal/personalSlice';
import { deleteCv, downloadCV } from '~/store/features/resume/resumeSlice';
import Rightside from './Rightside';

const Hero = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cv = useSelector(state => state.resumes.cv);
    const [hoveredCv, setHoveredCv] = useState(null);

    useEffect(() => {
        dispatch(downloadCV());
    }, [dispatch]);

    const handleCreate = () => {
        navigate('dashboard');
        dispatch(createCv());
    };

    const handleEdit = (cvId) => {
        navigate(`/dashboard/edit/${cvId}`);
    };

    const handleDelete = (cvId) => {
        dispatch(deleteCv({ id: cvId }))
        console.log(`Deleting CV with ID: ${cvId}`);
    };

    const handleDownload = (cvId) => {
        // Dispatch an action to download the CV
        // You may need to implement this action in your resumeSlice
        console.log(`Downloading CV with ID: ${cvId}`);
    };

    return (
        <div className='h-screen flex flex-col items-center'>
            <h1 className='text-center text-[60px]'>Your dashboard</h1>
            <div className='flex  flex-col items-center w-full'>
                <div className='flex  gap-2'>
                    {cv && cv.map((cvItem, index) => (
                        <div
                            className='border hover:border-2 h-[10rem] w-[7rem] border-primary-500 relative'
                            key={index}
                            onMouseEnter={() => setHoveredCv(index)}
                            onMouseLeave={() => setHoveredCv(null)}
                        >
                            <h1>{cvItem.title}</h1>
                            {hoveredCv === index && (
                                <div className='absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75'>
                                    <button
                                        className='btn btn-primary mb-2'
                                        onClick={() => handleEdit(cvItem.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => handleDownload(cvItem.id)}
                                    >
                                        Download
                                    </button>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => handleDelete(cvItem.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className=' justify-center items-center w-[50rem] mt-4'>
                    <button onClick={handleCreate}>
                        <Button bgColor={'primary-500'} textColor={'white'}>
                            +   Create New
                        </Button>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
