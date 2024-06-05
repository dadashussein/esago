import Button from "./Button";

const Header = ({auth}) => {

  return (
    <div className="flex px-8 justify-around h-[80px] shrink-0  items-center   sticky bg-bg-primary ">
      <h1 className="text-primary-500 font-bold text-[25px]">Esago</h1>
      <div>
        <ul className="flex gap-4 text-primary-500">
          <li>Templates</li>
          <li>Filter</li>
          <li>Subscription</li>
        </ul>
      </div>
      <div className="flex gap-4">
        <Button textColor="primary-500">
          {auth?.username ? auth.username : "Sign In"}
        </Button>
        <Button bgColor="primary-500" textColor="white">
         {auth?.username ? "Lets create CV" : "Sign Up"}
        </Button>
        
      </div>
    </div>
  );
};

export default Header;
