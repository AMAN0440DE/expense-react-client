import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('http://localhost:5001/auth/logout', {}, { withCredentials: true });
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        setUser(null);
        navigate("/login");
      }
    };
    performLogout();
  }, []);

  return null;
}

export default Logout;
