import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, auth, logOut }) {
  const [expanded, setExpanded] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  return (
    <aside className="h-screen">
      <nav
        className="h-full flex flex-col bg-white border-r dark:border-[#686D76]
            shadow-sm dark:bg-darkColor-2"
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <p
            className={`overflow-hidden dark:text-gray-400 transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Esago
          </p>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 hover:dark:bg-gray-600
                        dark:bg-darkColor-1 dark:text-white"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t dark:border-[#686D76] flex p-3 relative">
          <img
            src={
              auth?.profile_picture ||
              "https://ui-avatars.com/api/?name=John+Doe"
            }
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all dark:text-gray-400 ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold dark:text-gray-400">
                {auth?.username}
              </h4>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {auth?.email}
              </span>
            </div>
            {dropdown && (
              <div className="absolute right-2 bottom-16 mt-2 w-20 rounded-lg bg-white border shadow-md">
                <ul className="">
                  <li
                    onClick={logOut}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
            <div
              onClick={() => setDropdown(!dropdown)}
              className="cursor-pointer p-1  rounded-md hover:bg-gray-100"
            >
              <MoreVertical size={25} />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-opacity group z-50
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 "
            : "hover:bg-indigo-50 text-gray-600 dark:text-gray-400 dark:hover:bg-darkColor-1"
        }
    `}
    >
      {icon}
      <Link
        to={to}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </Link>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm dark:text-gray-300 dark:bg-darkColor-1
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
