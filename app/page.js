"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const [user, setUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [router]);

  return <div className="">sdfsdf</div>;
}
