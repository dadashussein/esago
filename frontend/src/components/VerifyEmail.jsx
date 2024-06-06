import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../store/features/auth/authSlice"; // Adjust the import path
import { unwrapResult } from "@reduxjs/toolkit";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { isLoading, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token) {
      dispatch(verifyEmail(token))
        .then(unwrapResult)
        .then(() => {
          setMessage("Email verification successful! Redirecting to login...");
          setError(null);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          setError(err);
          setMessage(null);
        });
    } else {
      setError("Invalid verification link.");
    }
  }, [dispatch, location.search, navigate]);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
            Email Verification
          </h3>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          {isLoading ? (
            <p>Verifying...</p>
          ) : (
            <>
              {message && <div className="text-green-500">{message}</div>}
              {error && <div className="text-red-500">{error}</div>}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail;
