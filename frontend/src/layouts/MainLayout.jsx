import { getCurrentUser, logout } from "@/store/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "./SideBar";
import { Layers, LayoutDashboard } from "lucide-react";
import BarLoading from "@/components/common/BarLoading";

export default function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);

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
      <div className="flex  w-full">
        <Sidebar auth={auth} logOut={handleLogout}>
          <SidebarItem to="/app" icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarItem to="template" icon={<Layers />} text="Template" />
        </Sidebar>

        <main
          className="flex-1 
         absolute left-10 md:static  dark:bg-darkColor-bg "
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
