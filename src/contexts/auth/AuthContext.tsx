import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as api from "@/libs/axios";
import { notification } from "antd";

interface AuthContextProps {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading !== null) return;

    const token = Cookies.get("access_token");
    if (token) {
      getUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await api.get("/auth/profile");
      if (response.status !== 200) {
        throw new Error(response.message);
      }
      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        notification.error({
          message: "Login failed",
          description: "Invalid username or password",
          duration: 2,
        })
      }

      const { access_token } = await response.json();
      Cookies.set("access_token", access_token, { expires: 7 }); // Set token to cookie
      getUser();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setLoading(false);
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
