import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";


export default function MainLayout() {
    return (
        <div className="flex w-full">
            <SideBar />
            <main className="flex-1  bg-gray-100 dark:bg-[#31363F] ">
                <Outlet />
            </main>
        </div>
    );
}