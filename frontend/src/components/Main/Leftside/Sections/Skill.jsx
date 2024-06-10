import React, { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSkill, postSkills } from '~/store/features/skills/skillsThunks';
import { useAutoAnimate } from '@formkit/auto-animate/react'


export default function Skill({ cvId }) {
  const dispatch = useDispatch()
  const [currentSkill, setCurrentSkill] = useState('');
  const skills = useSelector((state) => state.skills.skills)
  const [animationParent] = useAutoAnimate()

  const handleAdd = () => {
    if (currentSkill.trim() !== '') {
      const skillName = { name: currentSkill };
      dispatch(postSkills({ skillName, cvId }));
      setCurrentSkill('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill({ skillId: id, cvId }));
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
        <ul className='' ref={animationParent}>
          {skills.map((skill, index) => (
            <li key={index} className='flex justify-between items-center'>
              <p>{skill.name}</p>
              <FaRegTrashCan onClick={() => handleDelete(skill.id)}
                className='cursor-pointer' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
