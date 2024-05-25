import "./header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">esago</div>
      <Navbar />
      <button>Log Out</button>

    </div>
  );
};

export default Header;
