"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("loggedIn") ? true : false;
    }
  });
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const localUser = localStorage.getItem("localUser");
      return localUser ? JSON.parse(localUser) : {};
    }
  });
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      return router.push("/login");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
