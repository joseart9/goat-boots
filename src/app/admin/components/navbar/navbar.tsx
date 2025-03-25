"use client";
import { adminRoutes } from "@/app/components/navbar/routes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    // Llama al endpoint de logout para borrar la cookie
    const res = await fetch(`${process.env.BACKEND_AUTH}/auth/logout`, {
      method: "POST",
    });

    if (res.ok) {
      // Redirige a la página de inicio o login después del logout
      router.push("/");
    } else {
      console.error("Error al cerrar sesión");
    }
  };

  return (
    <nav className="bg-primary-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">
                Admin Panel
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {adminRoutes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === route.href
                      ? "border-secondary-500 text-secondary-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
