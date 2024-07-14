import spinner from "@/assets/animated/loading-spinner.svg";
import { Check } from "lucide-react";

const ReactiveButton = ({
  icon,
  text,
  status,
  onClick,
  className,
  disabled,
}) => {
  return (
    <>
      <button onClick={onClick} disabled={disabled} className={className}>
        {status === "loading" ? (
          <img
            className="animate-spin  fill-red-100 text-white"
            src={spinner}
            alt="spinner"
          />
        ) : status === "succeeded" ? (
          <Check size={"1.2rem"} />
        ) : (
          icon
        )}
        {text}
      </button>
    </>
  );
};

export default ReactiveButton;
