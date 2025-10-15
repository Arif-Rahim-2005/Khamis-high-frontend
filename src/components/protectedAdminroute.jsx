import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("⚠️ You must be logged in to access this page.");
        navigate("/");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const user = await res.json();

        if (user.role === "Admin") {
          setIsAdmin(true);
        } else {
          alert("⚠️ Only admins can access this page.");
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        alert("⚠️ Could not verify user. Please log in again.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return isAdmin ? children : null;
};

export default ProtectedAdminRoute;
