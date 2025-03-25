import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminNavbar } from "./components/navbar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("admin_token");

  if (!token) {
    redirect("/unauthorized");
  }

  // Realizar la validación del token contra el backend
  const response = await fetch(`${process.env.BACKEND_URL}/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token.value }),
  });

  // Si la validación falla, redirige a /unauthorized
  if (!response.ok) {
    redirect("/unauthorized");
  }

  return (
    <div className="font-mono">
      <AdminNavbar />
      {children}
    </div>
  );
}
