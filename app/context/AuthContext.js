"use client";
import Cookies from "js-cookie";
import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userRole: null,
    loading: true,
  });

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      setAuth({ isAuthenticated: false, userRole: null, loading: false });
      return;
    }
    const role = localStorage.getItem("user_role");
    setAuth({ isAuthenticated: true, userRole: role, loading: false });
  }, [token]);

  const setIsAuthenticated = (value) => {
    setAuth((prev) => ({ ...prev, isAuthenticated: value }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        setIsAuthenticated,
        token,
        userRole: auth.userRole,
        loading: auth.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
