import "./main.css";
import Leftside from "./Leftside/Leftside";
import Rightside from "./Rightside/Rightside";

const Main = () => {
  return (
    <div className="main">
      <Leftside />
      <Rightside />
    </div>
  );
};

export default Main;
