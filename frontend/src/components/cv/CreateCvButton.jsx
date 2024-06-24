import Tilt from "react-next-tilt";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";

const CreateCvButton = ({ cvTitle, handleInputChange, handleCreate }) => {
  return (
    <DropdownMenu.Root>
      <Tilt>
        <div
          className="w-[202px] h-[272px]
                 rounded flex items-center shadow-shadowOne
                  justify-center bg-[#FFEECC] dark:bg-darkColor-hover "
        >
          <DropdownMenu.Trigger asChild>
            <div className="cursor-pointer ">
              <Plus size={32} />
            </div>
          </DropdownMenu.Trigger>
        </div>

        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <div className="mt-[56px]  flex flex-col w-[11.2rem]">
              <input
                type="text"
                className="input-primary"
                placeholder="Enter CV title"
                value={cvTitle}
                onChange={handleInputChange}
              />
              <button
                onClick={handleCreate}
                className="border
                             text-sm  bg-white
                             dark:border-none
                             dark:bg-darkColor-bg dark:text-darkColor-text
                             "
              >
                Create
              </button>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </Tilt>
    </DropdownMenu.Root>
  );
};

export default CreateCvButton;
