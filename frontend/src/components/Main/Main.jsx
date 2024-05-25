import "./main.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Leftside from "./Leftside/Leftside";
import Rightside from "./Rightside/Rightside";

const Main = () => {
  const { userData } = useContext(AuthContext)
  console.log(userData);
  return <div className="main">
    <Leftside/>
    <Rightside />
  </div>;
};

export default Main;
