 import { redirect } from "next/navigation";

export default async function RootPage() {
  // If not authenticated, you would redirect to /login here
  redirect("/dashboard");
}