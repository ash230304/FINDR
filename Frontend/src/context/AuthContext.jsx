import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);  
  // null = checking, false = logged out, object = logged in user

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setAuth(res.data.user))  // store full user object
      .catch(() => setAuth(false));
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
