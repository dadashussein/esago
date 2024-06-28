import { Trash } from "lucide-react";
import { FileSliders } from "lucide-react";
import { X } from "lucide-react";
import ReactiveButton from "../common/ReactiveButton";
import { Download } from "lucide-react";
import Alert from "../common/Alert";

export default function CvModal({
  open,
  onClose,
  status,
  children,
  selectedCv,
  handleEdit,
  handleDelete,
  handleGenerate,
}) {
  return (
    <div
      className={`  fixed inset-0 flex justify-center items-center
         transition-colors ${open ? "visible bg-black/30" : "invisible"}`}
    >
      <div
        id="scrollbar1"
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded shadow max-w-full p-8 transition-all
        ${open ? "scale-100 opacity-100 max-w-4xl max-h-4xl overflow-auto" : "scale-50 opacity-0"}`}
        style={{ maxHeight: "90%", maxWidth: "90%", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400
           bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        {children}
      </div>
      <div
        className="flex border
       shadow-shadowOne   text-white bg-primary-500
      justify-center  rounded-md bottom-20 absolute"
      >
        <button
          className=" p-2 hover:bg-blue-500  rounded-l-md"
          onClick={() => handleEdit(selectedCv)}
        >
          <FileSliders />
        </button>

        <ReactiveButton
          className={"hover:bg-yellow-400  p-2"}
          onClick={handleGenerate}
          icon={<Download size={"1.5rem"} />}
          status={status}
        />

        {/* <button
          className="hover:bg-red-600  p-2 rounded-r-md"
          onClick={() => handleDelete(selectedCv)}
        > */}

        <Alert handleDelete={handleDelete} icon={<Trash />} />
        {/* </button> */}
      </div>
    </div>
  );
}
