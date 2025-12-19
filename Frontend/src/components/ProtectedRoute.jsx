import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import API from "../api/axios";

export default function ProtectedRoute({ children }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [checking, setChecking] = useState(true);
  

  useEffect(() => {
    // Already authenticated (full user object)
    if (auth && typeof auth === "object") {
      setChecking(false);
      return;
    }

    // Check from backend
    API.get("/auth/me")
      .then(res => {
        setAuth(res.data.user);   // store full user object
        setChecking(false);
      })
      .catch(() => {
        setAuth(false);
        setChecking(false);
      });

  }, []);

  if (checking) {
    return <div className="text-white p-10">Checking auth...</div>;
  }

  return auth ? children : <Navigate to="/login" />;
}
