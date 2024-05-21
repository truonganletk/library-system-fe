"use client";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useRouter } from "next/navigation";
import * as React from "react";
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  React.useEffect(() => {
    if (user) {
      router.push("/app/book");
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return null;
}
