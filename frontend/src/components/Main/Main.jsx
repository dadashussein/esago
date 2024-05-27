import Rightside from "../Rightside";
import Leftside from "./Leftside/Leftside";


const Main = () => {
  return (
    <div className="grid  lg:grid-cols-2">
      <Leftside />
      <Rightside />
    </div>
  );
};

export default Main;
