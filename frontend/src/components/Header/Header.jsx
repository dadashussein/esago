import "./header.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">esago</div>
      <Navbar />
      <button>Build your CV</button>
    </div>
  );
};

export default Header;
