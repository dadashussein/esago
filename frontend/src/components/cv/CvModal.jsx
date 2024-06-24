import { Trash } from "lucide-react";
import { FileSliders } from "lucide-react";
import { ArrowDownToLine } from "lucide-react";
import { X } from "lucide-react";

export default function CvModal({
  open,
  onClose,
  children,
  selectedCv,
  handleEdit,
  handleDelete,
  handleDownload,
}) {
  return (
    <div
      onClick={onClose}
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
        className="flex p-2 rounded-full border
       shadow-shadowOne 
      justify-center bottom-20 gap-4 absolute"
      >
        <button onClick={() => handleEdit(selectedCv)}>
          <FileSliders />
        </button>
        <button onClick={() => handleDownload(selectedCv)}>
          <ArrowDownToLine />
        </button>
        <button onClick={() => handleDelete(selectedCv)}>
          <Trash />
        </button>
      </div>
    </div>
  );
}
