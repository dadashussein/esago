import { useEffect } from "react";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";

const BarLoading = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isLoading) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  return <LoadingBar color="#33CC8C" progress={progress} />;
};

export default BarLoading;
