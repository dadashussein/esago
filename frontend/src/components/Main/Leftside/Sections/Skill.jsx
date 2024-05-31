import { useDispatch, useSelector } from "react-redux";
import {
  addSkill,
  removeSkill,
} from "../../../../store/features/skills/skillSlice";

const Skill = () => {
  const skill = useSelector((state) => state.skills.skills);
  const dispatch = useDispatch();
  const handleAddSkill = () => {
    dispatch(addSkill(""));
  };

  const handleChange = (e, i) => {
    dispatch(addSkill(e.target.value, i));
  };
  const handleRemoveSkill = (i) => {
    dispatch(removeSkill(i));
  };
  return (
    <div className="border-gray-900/10 p-6">
      <h1 className="font-semibold text-[30px] text-gray-900">Skills</h1>
      <p className="text-sm leading-6 text-gray-600">
        Add your most relevant skills
      </p>
      <div className="flex items-center justify-between">
        <button
          onClick={handleAddSkill}
          className="flex items-center text-gray-600 hover:text-red-500 duration-200 ease-linear "
        >
          Add Skill
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-6">
        {skill.map((s, i) => (
          <div key={i} className="sm:col-span-3 inline-block">
            <label className="label-primary" htmlFor={`skill-${i}`}>
              Skill
            </label>
            <input
              className="input-primary"
              type="text"
              name={`skill-${i}`}
              value={s}
              onChange={(e) => handleChange(e, i)}
            />
            <button onClick={() => handleRemoveSkill(i)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
