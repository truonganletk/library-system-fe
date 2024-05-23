"use client";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import * as React from "react";

export default function Provider({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}
