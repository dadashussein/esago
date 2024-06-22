import Avatars from "@/components/common/Avatar";
import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, auth, logOut }) {
  const [expanded] = useState(false);

  return (
    <aside className="h-full ">
      <nav
        className="h-full flex flex-col  border-r dark:border-[#686D76]
            shadow-sm dark:bg-darkColor-2"
      >
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <Avatars auth={auth} logOut={logOut} />
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, to }) {
  const { expanded } = useContext(SidebarContext);

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
      <Link
        to={to}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </Link>

      <div
        className={`
          absolute left-full rounded-md px-2   py-1 ml-6
          bg-green-100 text-primary-500 text-sm dark:text-gray-300 dark:bg-darkColor-1
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
      >
        {text}
      </div>
    </li>
  );
}
