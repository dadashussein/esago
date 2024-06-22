const Header = () => {
  return (
    <div
      className="flex px-8 justify-around h-[80px]
    shrink-0 border-b items-center sticky 
     bg-bg-primary dark:bg-[#171717] dark:border-[#686D76]"
    >
      <h1 className="text-primary-500 dark:text-[#c2c9d6] font-bold text-[25px]">
        Esago
      </h1>
      <div>
        <ul className="flex gap-4 text-primary-500 dark:text-[#c2c9d6] ">
          <li>Templates</li>
          <li>Filter</li>
          <li>Subscription</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
