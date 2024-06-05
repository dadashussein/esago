const Button = ({ bgColor, textColor, children, classname }) => {
  return (
    <button
      className={`bg-${bgColor} text-${textColor} inline-flex py-[10px] px-[30px] rounded-[20px] ${classname}`}
    >
      {children}
    </button>
  );
};

export default Button;
