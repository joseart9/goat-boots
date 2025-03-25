import { redirect } from "next/navigation";

export default function AdminPage() {
  // const redirectUrl = "/admin/productos";
  // const loginUrl = `http://localhost:3000/login/${process.env.NEXT_PUBLIC_PROJECT_ID}?redirectUrl=${redirectUrl}`;
  return redirect("/admin/productos");
}
