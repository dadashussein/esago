import { useNavigate } from "react-router-dom";


const Header = ({ auth, handleLogout, img }) => {

  return (
    <div className="flex px-8 justify-around h-[80px] shrink-0 items-center sticky bg-bg-primary">
      <h1 className="text-primary-500 font-bold text-[25px]">Esago</h1>
      <div>
        <ul className="flex gap-4 text-primary-500">
          <li>Templates</li>
          <li>Filter</li>
          <li>Subscription</li>
        </ul>
      </div>
      <div className="flex gap-4">
        <div className="inline-flex py-[10px] px-[30px] bg-white text-primary-500 rounded-[20px]">
          {auth?.username ? (
            <img className="w-14 h-14 rounded-full" src={img} alt="" />
          ) : (
            <h1>Sign in</h1>
          )}
        </div>
        {auth?.username ? (
          <button
            onClick={handleLogout}
            className="bg-primary-500 inline-flex py-[10px] px-[30px] rounded-[20px] text-white"
          >
            Log out
          </button>
        ) : (
          <button
            className="bg-primary-500 inline-flex py-[10px] px-[30px] rounded-[20px] text-white"
          >
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
