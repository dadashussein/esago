import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DraftingCompass, Trash2 } from "lucide-react";
import { deleteSkill, postSkills } from "@/store/features/skills/skillsThunks";

export default function Skill({ cvId }) {
  const dispatch = useDispatch();
  const [currentSkill, setCurrentSkill] = useState("");
  const skills = useSelector((state) => state.skills.skills);
  const [animationParent] = useAutoAnimate();

  const handleAdd = () => {
    if (currentSkill.trim() !== "") {
      const skillName = { name: currentSkill };
      dispatch(postSkills({ skillName, cvId }));
      setCurrentSkill("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteSkill({ skillId: id, cvId }));
  };

  return (
    <div className="">
      <h1 className="section-title ">
        <span>
          <DraftingCompass size={"1.7rem"} />
        </span>
        Skills
      </h1>
      <div className="">
        <div className="flex flex-col gap-2  my-4">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            className="input-primary"
            placeholder="Type skill"
          />
          <button onClick={handleAdd} className="button-primary">
            Add Skill
          </button>
        </div>
        <ul
          className="dark:text-white text-gray-900 h-[20rem] border"
          ref={animationParent}
        >
          {skills.map((skill, index) => (
            <li key={index} className="flex justify-between items-center">
              <p>{skill.name}</p>
              <Trash2
                onClick={() => handleDelete(skill.id)}
                className="cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
