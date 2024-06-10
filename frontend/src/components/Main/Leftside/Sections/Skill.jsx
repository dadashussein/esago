import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { postSkills } from '~/store/features/skills/skillsThunks';

export default function Skill({ cvId }) {
  const dispatch = useDispatch()
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');



  const handleAdd = () => {
    if (currentSkill.trim() !== '') {
      setSkills([...skills, currentSkill]);
      const data = {
        name: currentSkill,
        level: "Beginner",
      }
      dispatch(postSkills({ skill: data, cvId }));
      setCurrentSkill('');
    }
  };

  const handleDelete = (id) => {
    const updatedSkills = skills.filter((skill, index) => index !== id);
    setSkills(updatedSkills);
  };

  return (
    <div className='p-6'>
      <h1>Most relevant skill</h1>
      <div className=''>
        <div className='flex flex-col gap-2 my-4'>
          <input
            type="text"
            value={currentSkill}
            onChange={e => setCurrentSkill(e.target.value)}
            className='border outline-none p-2'
            placeholder='Type skill'
          />
          <button
            onClick={handleAdd}
            className='border p-2 bg-primary-500 rounded-md text-white'
          >
            Add Skill
          </button>
        </div>
        <ul className=''>
          {skills.map((skill, index) => (
            <li key={index} className='border-b relative py-1'>
              {skill}
              <span onClick={() => handleDelete(index)} className='absolute right-0 text-red-500 cursor-pointer'>
                <MdDelete size={"1.5rem"} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
