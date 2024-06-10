import { MdOutlineDashboard, MdOutlineFilterFrames, MdSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function SideBar() {
    const auth = useSelector((state) => state.auth.currentUser);
    let imgURl = auth?.profile_picture
        ? `http://localhost:8000/static/profiles/${auth.profile_picture}`
        : "../../../../assets/avatar.jpg";

    return (
        <aside className="w-[320px] h-screen border-r border-gray-200 bg-white p-6">
            <h1 className="text-2xl font-bold mb-8">Esago</h1>
            <nav className="mb-8">
                <ul>
                    <li className="mb-4">
                        <Link to="/app" className="flex items-center text-gray-700 font-semibold">
                            <MdOutlineDashboard size={20} className="mr-2" />
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="template" className="flex items-center text-gray-700">
                            <MdOutlineFilterFrames size={20} className="mr-2" />
                            Templates
                        </Link>
                    </li>

                </ul>
            </nav>
            <div className="mt-auto">
                <ul>
                    <li className="mb-4">
                        <a href="#" className="flex items-center text-gray-700">
                            <MdSettings size={20} className="mr-2" />
                            Settings
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center text-gray-700">
                            <i className="fas fa-question-circle mr-2"></i>
                            Help & Support
                        </a>
                    </li>
                    <li className="mb-4">
                        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-full w-full">
                            <i className="fas fa-crown mr-2"></i>
                            Upgrade to Pro
                        </button>
                    </li>
                    <li className="flex gap-2 items-center">
                        <img src={imgURl} alt="" className="w-10 h-10 rounded-md" />
                        <div>
                            <p className="font-semibold">{auth?.username}</p>
                            <p className="text-gray-500 text-sm">{auth?.email}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
