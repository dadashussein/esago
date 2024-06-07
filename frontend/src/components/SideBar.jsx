import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdChevronLeft, MdChevronRight, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { logout } from "~/store/features/auth/authSlice";
import avatar from "../assets/avatar.jpg"

const SideBarContext = createContext();

export default function SideBar({ children }) {
  const auth = useSelector((state) => state.auth.currentUser);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const loadingBarRef = useRef(null);
  const [open, setOpen] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  let imgURl = auth?.profile_picture
    ? `http://localhost:8000/static/profiles/${auth.profile_picture}`
    : "/assets/avatar.jpg";

  const email = auth?.email || "email";
  const username = auth?.username || "username";



  useEffect(() => {
    if (!currentUser) {
      loadingBarRef.current.continuousStart();
    } else {
      loadingBarRef.current.complete();
    }
  }, [currentUser]);

  return (
    <>
      <LoadingBar color="#33CC8C" shadow={true} height={4} ref={loadingBarRef} />
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="pb-2 p-4 flex justify-between items-center">
            <span
              className={`overflow-hidden text-[30px] transition-all duration-500 ${open ? "w-32" : "w-0"
                }`}
            >
              Esago
            </span>
            <button
              onClick={() => setOpen(!open)}
              className="p-1.5 rounded-lg text-white bg-primary-500 hover:bg-primary-600"
            >
              {open ? (
                <MdChevronLeft size={25} />
              ) : (
                <MdChevronRight size={25} />
              )}
            </button>
          </div>
          <SideBarContext.Provider value={{ open }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SideBarContext.Provider>
          <div className="border-t relative flex p-3">
            <img src={imgURl} alt="" className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-500
                ${open ? "w-52" : "w-0"} 
                ml-3`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{username}</h4>
                <span className="text-xs text-gray-600">{email}</span>
              </div>
              {dropdown && (
                <div className="absolute right-0 bottom-16 mt-2 w-20 rounded-lg bg-white border shadow-md">
                  <ul className="">
                    <li
                      onClick={handleLogout}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              <div
                onClick={() => setDropdown(!dropdown)}
                className="cursor-pointer p-1 rounded-md hover:bg-gray-100"
              >
                <MdMoreVert size={25} />
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SideBarItem({ icon, text, active, alert }) {
  const { open } = useContext(SideBarContext);
  return (
    <li
      className={`flex relative items-center gap-2 py-2 px-3 my-1 font-medium rounded-md
        cursor-pointer transition-colors duration-500 group
        ${active
          ? "bg-primary-500 text-white"
          : "hover:bg-gray-100 text-gray-700"
        }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-500 ${open ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-primary-500 ${open ? "" : "top-2"
            }`}
        ></div>
      )}
      {!open && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-green-500 text-sm 
            invisible opacity-20 -translate-x-3 transition-all duration-500 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
