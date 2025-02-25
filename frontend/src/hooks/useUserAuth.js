import { showToast } from "@/components/common/Toastify";
import { login, register } from "@/store/features/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserAuth = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleRegister = async (formData) => {
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    const newUser = { username, email, password };
    try {
      await dispatch(register(newUser));
      showToast("Account created successfully", "success");
      navigate('/login');
    } catch (err) {
      setError(err);
    }

    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  const handleLogin = async (formData) => {
    const { username_or_email, password } = formData;

    if (!username_or_email || !password) {
      setError("Both fields are required");
      return;
    }

    const user = { username_or_email, password };
    try {
      const response = await dispatch(login(user));
      const data = unwrapResult(response);
      showToast("Login successful", "success");
      navigate("/redirect", { state: { data } });
    } catch (err) {
      setError(err);
    }

    setTimeout(() => {
      setError(null);
    }, 4000);
  };

  return { error, isLoading, handleRegister, handleLogin };
};

export default useUserAuth;
