import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DraftingCompass } from "lucide-react";
import { deleteSkill, postSkills } from "@/store/features/skills/skillsThunks";
import { X } from "lucide-react";

export default function Skill({ cvId }) {
  const dispatch = useDispatch();
  const [currentSkill, setCurrentSkill] = useState("");
  const skills = useSelector((state) => state.skills.skills);
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
          <button onClick={handleAdd} className="btnPrimary">
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-4 gap-2 mb-16">
          {skills &&
            skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-gray-200 border relative border-darkColor-menu text-gray-500  px-4 py-3 rounded"
              >
                {skill.name}
                <span
                  onClick={() => handleDelete(skill.id)}
                  className="absolute cursor-pointer top-[1px] right-0"
                >
                  {<X size={"1rem"} />}
                </span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
  