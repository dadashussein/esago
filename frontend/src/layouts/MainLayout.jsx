import { getCurrentUser, logout } from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BarLoading from "@/components/common/BarLoading";
import { LayoutDashboard } from "lucide-react";
import { BookTemplate } from "lucide-react";
import { Settings2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const auth = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const handleSidebar = () => {
    //handle with local storage
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      localStorage.setItem("isSidebarOpen", "true");
    } else {
      localStorage.setItem("isSidebarOpen", "false");
    }
  };

  useEffect(() => {
    const isSidebar = localStorage.getItem("isSidebarOpen");
    if (isSidebar === "false") {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <BarLoading isLoading={isLoading} />
      <div className="flex h-screen bg-landing-texture  w-full">
        {/* sidebar */}
        <div
          className={` bg-primary-500/20 rounded-lg border relative flex flex-col sideBarShowAnime
           m-1 px-3 py-5 ${isSidebarOpen ? "w-[15rem] " : " w-[5rem]"}`}
        >
          {/* sidebar headaer */}
          <div className="flex items-center gap-2">
            <img
              className={`w-16 border-2 border-white rounded-full h-16 object-cover sideBarShowAnime	${!isSidebarOpen && "w-11 h-11"}`}
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
              alt=""
            />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-[10px]">Good Day</span>
                <span className="font-bold">{auth?.username}</span>
              </div>
            )}
            <button className="h-[2.7rem] w-[1.2rem ] absolute right-0 top-20 text-gray-500 rounded-l-xl bg-white">
              {isSidebarOpen ? (
                <ChevronLeft onClick={handleSidebar} />
              ) : (
                <ChevronRight onClick={handleSidebar} />
              )}
            </button>
          </div>
          {/* sidebar body */}
          <div>
            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700 " />
            <div>
              <ul
                className={` w-full   flex  flex-col  ${!isSidebarOpen && "items-center"}`}
              >
                <li className=" p-2 transition-all hover:duration-150 ease-in hover:bg-white/50 cursor-pointer rounded-xl flex text-gray-500  items-center gap-2">
                  <LayoutDashboard />
                  {isSidebarOpen && <span>Dashboard</span>}
                </li>
                <li className=" p-2 transition-all hover:duration-150 ease-in hover:bg-white/50 cursor-pointer rounded-xl flex text-gray-500  items-center gap-2">
                  <BookTemplate />
                  {isSidebarOpen && <span>Templates</span>}
                </li>
                <li className="p-2 transition-all hover:duration-150 ease-in hover:bg-white/50 cursor-pointer rounded-xl flex text-gray-500  items-center gap-2">
                  <Settings2 />
                  {isSidebarOpen && <span>Settings</span>}
                </li>
                <li className=" p-2 transition-all hover:duration-150 ease-in hover:bg-white/50 cursor-pointer rounded-xl flex text-gray-500  items-center gap-2">
                  <LogOut />
                  {isSidebarOpen && <span onClick={handleLogout}>Logout</span>}
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div></div>
        </div>
        <main
          className="flex-1 
          dark:bg-darkColor-bg "
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
