import styles from "./menu.module.css";
import { routes } from "../routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu({ toggle }: any) {
    const pathname = usePathname();
    return (
        <nav className={styles.menu}>
            <ul className="flex flex-col justify-center space-y-10 p-6">
                {routes.map((route, index) => (
                    <li key={index}>
                        <Link
                            href={route.href}
                            className={`text-3xl ${pathname === route.href ? "text-secondary-500 font-semibold scale-110" : "text-white"}`}
                            onClick={toggle}
                        >
                            {route.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link
                        href="/catalogo"
                        className={`text-3xl ${pathname === "/catalogo" ? "text-secondary-500 font-semibold scale-110" : "text-white"}`}
                        onClick={toggle}
                    >
                        Catálogo
                    </Link>
                </li>
            </ul>
        </nav>
    );
}