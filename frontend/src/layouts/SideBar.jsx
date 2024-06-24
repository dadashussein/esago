import Avatars from "@/components/common/Avatar";
import { createContext } from "react";
import { Link } from "react-router-dom";
const SidebarContext = createContext();

export default function Sidebar({ children, auth, logOut }) {
  return (
    <aside
      className="min-h-screen md:static fixed justify-center items-center  flex
    bg-gradient-to-tr
      from-green-200 to-green-100 text-gray-800
     dark:from-darkColor-hover dark:to-darkColor-hover 
      "
    >
      <nav
        className="h-full flex flex-col
         items-center justify-center border-r dark:border-none
            shadow-sm "
      >
        <SidebarContext.Provider>
          <ul>{children}</ul>
        </SidebarContext.Provider>
        <Avatars auth={auth} logOut={logOut} />
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, to }) {
  return (
    <li
      className={`
        relative flex items-center py-2 px-1 md:px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-opacity group z-50
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-gray-800 "
            : "hover:bg-green-50 text-gray-600 dark:text-gray-400 dark:hover:bg-darkColor-1"
        }
    `}
    >
      {icon}
      <Link to={to} className="overflow-hidden transition-all w-0 ml-3">
        {text}
      </Link>

      <div
        className={`
          absolute left-full rounded-md px-2   py-1 ml-4
          bg-green-100 text-primary-500 text-sm dark:text-gray-300 dark:bg-darkColor-bg
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
      >
        {text}
      </div>
    </li>
  );
}
