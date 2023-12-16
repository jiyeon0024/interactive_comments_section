"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";

export default function Home() {
  const { loggedIn } = useAuthContext();
  const router = useRouter();

  if (!loggedIn) {
    return router.replace("/login");
  } else {
    router.push("/");
  }

  // useEffect(async () => {
  //   if (!loggedIn) {
  //     router.push("/login");
  //   } else {
  //     router.push("/");
  //   }
  // }, [loggedIn]);

  console.log(loggedIn);
  console.log("sdfsdf");

  return <div className="">sdfsdf</div>;
}
