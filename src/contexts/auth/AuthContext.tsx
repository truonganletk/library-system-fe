import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

// Define types for your authentication context
interface AuthContextProps {
  user: any;
  login: (
    username: string,
    password: string,
    callback: () => void
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user:", error);
    }
  };

  const login = async (
    username: string,
    password: string,
    callback: () => void
  ) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { access_token } = await response.json();
      Cookies.set("access_token", access_token, { expires: 7 }); // Set token to cookie
      getUser();
    } catch (error) {
      console.error("Login failed", error);
      callback();
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("access_token"); // Remove token from cookie
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
