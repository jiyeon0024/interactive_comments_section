"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";

export default function Home() {
  const { loggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [router]);

  return <div className="">sdfsdf</div>;
}
