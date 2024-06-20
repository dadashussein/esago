import { useState } from "react";
import axios from "axios";
import { compile } from "@fileforge/react-print";


const useCompileHtml = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compileToHtml = async (component, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const html = await compile(component);
      const response = await axios.post("http://localhost:3001/generate-pdf", { html }, {
        responseType: 'blob',
      });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    console.log(component);
  };

  return { compileToHtml, loading, error };
};

export default useCompileHtml;
