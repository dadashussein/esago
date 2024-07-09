import { useState } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";

const CreateCvButton = ({ cvTitle, handleInputChange, handleCreate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center justify-center ">
      <div
        className="w-[202px] h-[272px]
                 rounded flex items-center border 
                 justify-center bg-white/40 backdrop-blur-xl dark:bg-darkColor-hover "
      >
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <Minus size={32} /> : <Plus size={32} />}
        </div>
      </div>

      {open && (
        <div className="absolute w-full items-center justify-center flex flex-col bottom-0 h-[5rem] bg-black/15 px-1 py-4   backdrop-blur-2xl   gap-2">
          <input
            type="text"
            className="focus:outline-none text-center  text-sm p-1 rounded"
            placeholder="Enter CV title"
            value={cvTitle}
            onChange={handleInputChange}
          />
          <button
            onClick={handleCreate}
            className="py-0 px-1 text-sm bg-white rounded"
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCvButton;
