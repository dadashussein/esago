import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { baseUrl } from "@/utils/api";

const Avatars = ({ auth, logOut }) => {
  let imgURl = `${baseUrl}/static/cv_pictures/${auth?.picture}`;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex items-center justify-center border ">
          <Avatar.Root className="bg-blackA1 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={imgURl}
              alt="Colm Tuite"
            />
            <Avatar.Fallback
              className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={600}
            >
              {auth?.username?.slice(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade 
                    data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        >
          <DropdownMenu.Item className="flex items-center justify-between p-2 hover:bg-gray-100">
            <button className="outline-none" onClick={logOut}>
              Log out
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center justify-between p-2 hover:bg-gray-100">
            Change Photo
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
export default Avatars;
