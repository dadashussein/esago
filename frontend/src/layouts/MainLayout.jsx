import { getCurrentUser, logout } from "@/store/features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Sidebar, { SidebarItem } from "./SideBar";
import { Layers, LayoutDashboard } from "lucide-react";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (isLoading) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingBar color="#33CC8C" progress={progress} />
      <div className="flex relative w-full">
        <div className="h-screen ">
          <Sidebar auth={auth} logOut={handleLogout}>
            <SidebarItem
              to="/app"
              icon={<LayoutDashboard />}
              text="Dashboard"
            />
            <SidebarItem to="template" icon={<Layers />} text="Template" />
          </Sidebar>
        </div>
        <main className="flex-1  dark:bg-[#31363F] ">
          <Outlet />
        </main>
      </div>
    </>
  );
}
