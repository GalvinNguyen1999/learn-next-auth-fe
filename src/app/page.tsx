"use client";

import { SessionProvider } from "next-auth/react";
import AuthComponent from "./test/page";

export default function Home() {
  return (
    <SessionProvider>
      <AuthComponent />
    </SessionProvider>
  );
}
