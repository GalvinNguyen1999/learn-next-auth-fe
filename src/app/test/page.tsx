"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthComponent() {
  const session = useSession() || {};

  if (!!session.data) {
    return (
      <>
        <p>Signed in as {session.data.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
