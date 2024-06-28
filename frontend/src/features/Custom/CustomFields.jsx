import { deleteCustom } from "@/store/features/other/otherSlice";
import { Grip } from "lucide-react";
import { Trash } from "lucide-react";
import { Edit } from "lucide-react";
import { useDispatch } from "react-redux";
import CustomItems from "./CustomItems";

const CustomFields = ({ custom, cvId }) => {
    const dispatch = useDispatch();
    const handleDelete = (id) => {
        dispatch(deleteCustom({ cvId, id }));
    };


    return (
        <div className="border-t">
            {custom?.map((i) => (
                <div key={i.id} >
                    <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-4">
                            <span><Grip /></span>
                            <p className="text-lg font-semibold">{i.name}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="text-gray-600 hover:text-blue-500 duration-200 ease-linear">
                                <Edit size={"1.5rem"} />
                            </button>
                            <button
                                onClick={() => handleDelete(i.id)}
                                className="text-gray-600 hover:text-red-500 duration-200 ease-linear ml-2"
                            >
                                <Trash size={"1.5rem"} />
                            </button>
                        </div>
                    </div>
                    <div className="border-t" />
                    <CustomItems items={i} />
                </div>
            ))}
        </div>
    );
};

export default CustomFields;
