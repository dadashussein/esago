import { useState } from "react";
import { useDispatch } from "react-redux";
import { changhePicture } from "@/store/features/auth/authSlice";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function EditProfile({ buttonTag }) {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    dispatch(changhePicture(avatar));
    window.location.reload();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{buttonTag}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 fixed inset-0" />
        <Dialog.Content className="fixed top-[50%] left-[50%] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-lg focus:outline-none">
          <Dialog.Title className="text-lg font-medium text-gray-900">
            Edit Profile Picture
          </Dialog.Title>
          <Dialog.Description className="mt-2 mb-4 text-sm text-gray-600">
            Upload a new profile picture. Max file size 5MB.
          </Dialog.Description>
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="mb-4"
            />
            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Dialog.Close asChild>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded-md"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none absolute top-3 right-3"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
