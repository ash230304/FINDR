import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/auth/me")
      .then(res => {
        setUser(res.data.user);
        setAuth(true);
      })
      .catch(() => {
        setUser(null);
        setAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, user, setAuth, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
