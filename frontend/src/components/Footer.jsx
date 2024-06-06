const Footer = () => {
  return (
    <footer className="h-[384px] px-[200px] sticky py-[80px] flex-shrink-0 w-full bg-darkPrimary-800">
      <div className="grid grid-cols-5 items-center   justify-center gap-[20px] mb-8  text-white">
        <div>
          <h1 className="text-[60px] font-[500] ">ESAGO</h1>{" "}
          <p className="text-[18px] opacity-[0.8] font-[400]">
            Holberton Azerbaijan portfolio project
          </p>
        </div>
        <div className="ml-8">
          <h1 className="text-[20px] font-[500]">Resources</h1>
          <p className="opacity-[0.8] font-[400] text-[16px]">Templates</p>
          <p className="opacity-[0.8] font-[400] text-[16px]">Resume | CV</p>
          <p className="opacity-[0.8] font-[400] text-[16px]">Resume filtering</p>
        </div>
        <div>
          <h1 className="text-[20px] font-[500]">Products</h1>
          <p className="opacity-[0.8] font-[400] text-[16px]">Premium Subscription</p>
          <p className="opacity-[0.8] font-[400] text-[16px]">Resume filtering Subscription</p>
        </div>
        <div>
          <h1 className="text-[20px] font-[500]">Support</h1>
          <p className="opacity-[0.8] font-[400] text-[16px]">FAQ’s</p>
          <p className="opacity-[0.8] font-[400] text-[16px]">Contact US</p>
        </div>
        <div>Translate</div>
      </div>
      <hr />
      <div className="flex justify-between mt-8 font-[400] text-white">
        <div><span>© 2024 Esago, All Rights Reserved</span></div>
        <div className="flex gap-8">
          <span>Terms & conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
