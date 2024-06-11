import { ChevronFirstIcon, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { MdChevronLeft, MdChevronRight, MdOutlineDashboard, MdOutlineFilterFrames } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



const SideBarContext = createContext();
export default function SideBar({ children }) {
    const [expand, setExpand] = useState(true);
    const auth = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let imgURl = auth?.profile_picture && `http://localhost:8000/static/profiles/${auth.profile_picture}`;

    return (
        <aside className="h-screen">
            <nav className="flex h-full flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center ">
                    <img src="htttps" className={`overflow-hidden transition-all ${expand ? "w-32" : "w-0"}`} alt="" />
                    <button onClick={() => setExpand(!expand)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                        {expand ? <ChevronFirstIcon size={24} /> : <ChevronLast size={24} />}
                    </button>
                </div>
                <SideBarContext.Provider value={{ expand }}>
                    <ul className="flex-1 px-3">
                        {children}
                    </ul>
                </SideBarContext.Provider>
                <div className="border-t flex p-3">
                    <img src={imgURl} alt="" className="w-10 h-10 rounded-md" />
                    <div className={`
                        flex justify-between items-center w-52 ml-3
                         overflow-hidden transition-all ${expand ? "w-52 ml-3" : "w-0"}
                        `}>
                        <div className="leading-4">
                            <h4 className="font-semibold">{auth?.username}</h4>
                            <span className="text-xs text-gray-600">{auth?.email}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>


        </aside>
    );
}


export function SideBarLink({ icon, text, active, alert }) {
    const { expand } = useContext(SideBarContext);
    return (
        <li className={`
            relative flex items-center py-2 px-3 my-1  font-medium rounded-md cursor-pointer
            transition-colors
            ${active ? "bg-gradient-to-tr from-indigo-200  to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }
        `}>
            {icon}

            <span className={`overflow-hidden transition-all ${expand ? "w-52 ml-3" : "w-0"}`}>
                {text}
            </span>
            {alert && (
                <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expand ? "" : "top-2"}`} />
            )}
        </li>
    );
}


