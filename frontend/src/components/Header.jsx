const Header = () => {
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
    </div>
  );
};

export default Header;
