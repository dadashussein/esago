import { getCurrentUser, logout } from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import BarLoading from "@/components/common/BarLoading";
import { LayoutDashboard } from "lucide-react";
import { Settings2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import EditProfile from "@/components/common/EditProfile";
import { baseUrl } from "@/utils/api";
import avatar from "@/assets/avata.png";

export default function MainLayout() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const auth = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const baseImgUrl = baseUrl + "/static/profiles/" + auth?.profile_picture;

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <BarLoading isLoading={isLoading} />
      <div className="flex h-screen bg-landing-texture  w-full">
        {/* sidebar */}
        <div
          className={` bg-[#F9FAFB] border   border-bg-[#E5E6EB] relative flex flex-col sideBarShowAnime
             py-5 ${isSidebarOpen ? "w-[15rem] px-3" : " w-[5rem] px-1"}`}
        >
          {/* sidebar headaer */}
          <div className="flex items-center gap-2">
            <img
              className={`w-14 border-2 border-white rounded-full h-14 object-cover sideBarShowAnime	
                
                ${!isSidebarOpen && "w-11 h-11"}`}
              src={
                baseImgUrl.includes(null) || baseImgUrl.includes(undefined)
                  ? avatar
                  : baseImgUrl
              }
              alt=""
            />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-[10px]">Good Day</span>
                <span className="font-bold text-[12px]">{auth?.username}</span>
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

                <EditProfile
                  buttonTag={
                    <button className="p-2 transition-all hover:duration-150 ease-in hover:bg-white/50 cursor-pointer rounded-xl flex text-gray-500  items-center gap-2">
                      <Settings2 />
                      {isSidebarOpen && <span>Settings</span>}
                    </button>
                  }
                />
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
          dark:bg-darkColor-bg bg-white/70 "
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
