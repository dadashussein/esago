import { deleteLanguage, postLanguages } from "@/store/features/languages/languagesThunks";
import { X } from "lucide-react";
import { LanguagesIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


export default function Languages({ cvId }) {
  const dispatch = useDispatch();
  const [currentLanguage, setCurrentLanguage] = useState({
    name: "",
    proficiency: "beginner",
  });
  const languages = useSelector((state) => state.languages.languages);
  console.log(languages);


  const handleAdd = () => {
    dispatch(postLanguages({ language: currentLanguage, cvId }));
  }

  const handleDelete = (languageId) => {
    console.log(languageId);
    dispatch(deleteLanguage({ languageId, cvId }));
  }
  return (
    <div>
      <h1 className="section-title">
        <span>
          <LanguagesIcon size={"1.7rem"} />
        </span>
        Languages
      </h1>
      <p className="section-description">
        Add the languages you speak and your proficiency level.
      </p>
      <div className="flex flex-col gap-2 my-4">
        <input
          className="input-primary"
          type="text"
          placeholder="Language"
          value={currentLanguage.name}
          onChange={(e) =>
            setCurrentLanguage({ ...currentLanguage, name: e.target.value })
          }
        />
        <select
          className="input-primary"
          onChange={(e) =>
            setCurrentLanguage({ ...currentLanguage, proficiency: e.target.value })
          }
          value={currentLanguage.proficiency}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="fluent">Fluent</option>
        </select>
        <button onClick={handleAdd} className="btnPrimary">
          Add
        </button>

      </div>

      <div className="flex flex-col  mt-4 gap-2 mb-6">
        {languages.length > 0 && languages.map((language, index) => (
          <div key={index} className="bg-gray-200  border relative text-gray-500  px-4 py-2 rounded ">
            <p>{language.name}
              <span className="text-gray-500"> - {language.proficiency}</span>
              <button
                onClick={() => handleDelete(language.id)}
                className="absolute right-2 top-2"
              >
                <X />
              </button>
            </p>
          </div>
        ))}
      </div>


    </div>
  )
}
