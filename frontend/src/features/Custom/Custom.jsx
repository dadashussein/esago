import {
  addNewItems,
  createCustom,
  fetchCustom,
} from "@/store/features/other/otherSlice";
import { PlusCircle, Combine } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomFields from "./CustomFields";

export default function Custom({ cvId }) {
  const dispatch = useDispatch();
  const { custom, status, error } = useSelector((state) => state.other);
  const [customName, setCustomName] = useState("");

  useEffect(() => {
    dispatch(fetchCustom(cvId));
  }, [cvId, dispatch]);

  const handleInputChange = (e) => {
    setCustomName(e.target.value);
  };

  const handleCreateCustom = () => {
    dispatch(createCustom({ cvId, customName }));
    setCustomName("");
  };

  const addNewItem = () => {
    dispatch(addNewItems());
  };

  return (
    <div>
      <h1 className="section-title">
        <span>
          <Combine size={"1.7rem"} />
        </span>
        Other
      </h1>
      <p className="section-description">
        This is a custom section. You can add any information you want here.
      </p>
      <div className="flex justify-center items-center mt-4">
        <button
          type="button"
          onClick={addNewItem}
          className="flex items-center text-gray-600 hover:text-blue-500 duration-200 ease-linear"
        >
          <PlusCircle size={"1.7rem"} />
          <span className="ml-2">Add custom item</span>
        </button>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {custom.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No custom items added yet.
        </p>
      )}

      {custom.length > 0 && (
        <div className="mt-4">
          <input
            type="text"
            value={customName}
            onChange={handleInputChange}
            placeholder="Enter custom item name"
            className="input-primary"
          />
          <button
            type="button"
            onClick={handleCreateCustom}
            className="btn-primary mt-2"
          >
            Save
          </button>
        </div>
      )}
      <CustomFields custom={custom} cvId={cvId} />
    </div>
  );
}
