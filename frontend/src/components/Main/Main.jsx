import Leftside from "./Leftside/Leftside";
import Rightside from "./Rightside/Rightside";

const Main = () => {
  return (
    <div className="grid  lg:grid-cols-2">
      <Leftside />
      <Rightside />
    </div>
  );
};

export default Main;
