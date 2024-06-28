import { useState } from "react";
import axios from "axios";
import { compile } from "@fileforge/react-print";
// eslint-disable-next-line no-unused-vars
import ReactDOMServer from "react-dom/server";

const pdfUrl = import.meta.env.VITE_PDF_URL;
const useCompileHtml = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle");

  const compileToHtml = async (component) => {
    setStatus("loading");
    setError(null);
    try {
      const html = await compile(component);
      const response = await axios.post(
        pdfUrl,
        { html },
        {
          responseType: "blob",
        },
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      setStatus("succeeded");
      window.open(url, "_blank");
    } catch (err) {
      setError(err);
      setStatus("failed");
    } finally {
      setStatus("idle");
    }
  };

  return { compileToHtml, status, error };
};

export default useCompileHtml;
