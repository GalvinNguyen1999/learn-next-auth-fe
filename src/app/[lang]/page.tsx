import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/vi/dashboard");
  } else {
    redirect("/vi/sign-in");
  }
}
