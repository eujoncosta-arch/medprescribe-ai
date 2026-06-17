"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    router.replace(isLoggedIn ? "/dashboard" : "/login");
  }, [isLoggedIn, router]);

  return null;
}
