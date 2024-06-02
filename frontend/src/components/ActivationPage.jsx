import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ActivationPage = () => {
  const { userId, token } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/users/activate/${userId}?token=${token}`, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Activation failed");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    activateUser();
  }, [userId, token]);

  const handleRedirect = () => {
    navigate("/login"); // or any other page you want to redirect to after activation
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Activation Page</h1>
      {userData ? (
        <div>
          <p>User activated successfully!</p>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleRedirect} className="bg-blue-500 text-white p-2 rounded-md mt-4">
            Go to Login
          </button>
        </div>
      ) : (
        <div>Failed to activate user</div>
      )}
    </div>
  );
};

export default ActivationPage;
