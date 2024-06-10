import { Outlet } from "react-router-dom";
import SideBar from "./sidebar";


export default function MainLayout() {
    return (
        <div className="flex w-full">
            <SideBar />
            <main className="flex-1 p-10 bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
}