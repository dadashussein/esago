import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.currentUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthChecked(true);
    }
  }, [isLoading]);

  if (!isAuthChecked) {
    // While loading the authentication status, you can show a loading spinner or nothing
    return <div>Loading...</div>; // Replace with a spinner or a skeleton screen if you prefer
  }

  if (!auth) {
    // If not authenticated, redirect to the home page
    return <Navigate to="/" />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
