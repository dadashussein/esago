import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/api";

const ActivateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const userId = data.data;

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter a 6-digit verification code.");
      return;
    }

    try {
      const response = await axiosInstance.get(`/users/activate/${userId}`, {
        params: { code },
      });
      if (response.status === 200) {
        const { data } = response;
        navigate("/redirect", { state: { data } });
      } else {
        setError("Failed to verify the code. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify the code. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10  text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Verify your email</h1>
        <p className="text-[15px] text-slate-500">
          Enter the verification code that was sent to your email.
        </p>
      </header>
      <form id="otp-form" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          {verificationCode.map((code, index) => (
            <input
              key={index}
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength="1"
              value={code}
              onChange={(e) => handleChange(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-primary-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account&apos;
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{" "}
        <a
          className="font-medium text-primary-500 hover:text-primary-200"
          href="#0"
        >
          Resend
        </a>
      </div>
    </div>
  );
};

export default ActivateUser;
