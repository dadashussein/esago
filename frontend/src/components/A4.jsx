import { useRef } from "react";
import "./a4.css";
import Preview from "./Preview";
import { compile } from "@fileforge/react-print";



const A4Component = ({ activeTemplate, cvId }) => {
  const printRef = useRef();
  const handlePrint = async () => {
    console.log(printRef.current);
    const html = await compile(printRef.current);
    console.log(html);
  };


  return (
    <>
      <div ref={printRef} className="page">
        <Preview activeTemplate={activeTemplate} cvId={cvId} />
      </div>
      <button onClick={handlePrint} >
        Generate burdan
      </button>
    </>
  );
};

export default A4Component;
