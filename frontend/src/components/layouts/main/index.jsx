import { Outlet, useNavigate } from "react-router-dom";
import SideBar, { SidebarItem } from "./sidebar";
import { Layers, LayoutDashboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, logout } from "~/store/features/auth/authSlice";
import Loading from "~/components/Loading";

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
      <div className="flex  w-full">
        <SideBar auth={auth} logOut={handleLogout}>
          <SidebarItem to="/app" icon={<LayoutDashboard />} text="Dashboard" />
          <SidebarItem to="template" icon={<Layers />} text="Template" />
        </SideBar>
        <main className="flex-1   bg-gray-100 dark:bg-[#31363F] ">
          {isLoading && <Loading />}
          <Outlet />
        </main>
      </div>
    </>
  );
}
