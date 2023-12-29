"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
const Layout = ({ children }) => {
  const { loggedIn } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedIn) {
      return router.push("/");
    }
    setLoading(false);
  }, []);

  return loading ? <p>LOADING</p> : <div>{children}</div>;
};

export default Layout;
