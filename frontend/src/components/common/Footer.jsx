const Footer = () => {
  return (
    <footer className="w-full py-14  text-white bg-darkPrimary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl  mx-auto">
          <a href="https://pagedone.io/" className="flex justify-center ">
            Esago
          </a>
          <ul className="text-lg   flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
            <li><a href="#">Esago</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#" >Resources</a></li>
            <li><a href="#" >Blogs</a></li>
            <li><a href="#">Support</a></li>
          </ul>

          <span className="text-lg text-center block">©<a href="https://pagedone.io/">Esago</a> 2024, All rights reserved.</span>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
