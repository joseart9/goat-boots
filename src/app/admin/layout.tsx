import { cookies } from "next/headers";
import { redirect, unauthorized } from "next/navigation";
import { AdminSidebar } from "../admin/components/admin-sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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

  const response = await fetch(`${process.env.BACKEND_URL}/auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token.value }),
  });

  if (!response.ok) {
    redirect("/unauthorized");
  }

  return (
    <div className={`${inter.className} flex dark:bg-secondary-500 bg-white`}>
      <AdminSidebar>{children}</AdminSidebar>
    </div>
  );
}
