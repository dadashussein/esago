import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";

import Hero from "~/components/Hero";
import SideBar, { SideBarItem } from "~/components/SideBar";
import { MdDashboard, MdOutlineFilterFrames, MdSettings } from "react-icons/md";

export default function Inner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="flex">
      <SideBar>
        <SideBarItem icon={<MdDashboard />} text="Dashboard" alert />
        <SideBarItem icon={<MdOutlineFilterFrames />} text="Template" />
        <hr />
        <SideBarItem icon={<MdSettings />} text="Settings" />
      </SideBar>
      <div className="flex flex-col w-full">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
