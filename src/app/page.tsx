import { redirect } from "next/navigation";

export default function RootPage() {
  // Default to Indonesian
  redirect("/id");
}
