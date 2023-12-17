"use client";
import { useAuthContext } from "./context/AuthContext";
import { useRouter, useEffect } from "next/navigation";
export default function Home() {
  const { user, loggedIn } = useAuthContext();
  const router = useRouter();

  // useEffect(() => {
  // if (!loggedIn) {
  //   router.replace("/login");
  // }
  // }, []);

  console.log(loggedIn);
  // console.log(user);
  return <div className="">sdfds</div>;
}
