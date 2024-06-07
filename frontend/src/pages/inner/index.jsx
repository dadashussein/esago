import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useEffect } from "react";
import { getCurrentUser } from "../../store/features/auth/authSlice";

import Hero from "~/components/Hero";
import SideBar, { SideBarItem } from "~/components/SideBar";
import { MdOutlineDashboard, MdOutlineFilterFrames, MdSettings } from "react-icons/md";

export default function Inner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="flex">
      <SideBar>
        <SideBarItem icon={<MdOutlineDashboard size={"1.5rem"} />} text="Dashboard" alert />
        <SideBarItem icon={<MdOutlineFilterFrames size={"1.5rem"} />} text="Template" />
        <hr />
        <SideBarItem icon={<MdSettings size={"1.5rem"} />} text="Settings" />
      </SideBar>
      <div className="flex flex-col w-full">
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  );
}
