import React, { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const { loggedIn, setLoggedIn } = useAuthContext();
  const router = useRouter();

  const logout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    if (!loggedIn) {
      localStorage.clear();
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <button
      onClick={() => {
        logout();
      }}
      type="button"
      className="bg-[#ed6468] text-white px-6 py-2 rounded-lg hover:bg-[#ffb8bb]"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
