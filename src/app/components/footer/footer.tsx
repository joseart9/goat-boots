"use client";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { routes } from "@/app/components/navbar/routes"
import useDarkMode from "@/app/hooks/useDarkMode"
import { useEffect, useState } from 'react';

const socials = [
    {
        name: "Facebook",
        url: "https://facebook.com"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/goatbootsmx"
    },
    {
        name: "Email",
        url: "mailto:ventas@goatboots.mx"
    },
]

export default function FooterSection() {
    const router = useRouter()
    const isDarkMode = useDarkMode()
    const date = new Date()
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <footer id="footer" className="lg:grid grid-cols-3 px-6 pt-8 lg:p-8 lg:pt-24 flex flex-col" style={{
            backgroundImage: `${isDarkMode ? "url('/textura1.png')" : "url('/textura2.png')"}`,
        }}>
            <img src="/logo2.png" alt="logo" className="hidden lg:block h-24 w-auto cursor-pointer" onClick={() => router.push("/")} />
            <section className="col-span-1 flex flex-col mb-12 lg:mb-0">
                <p className='pb-2 uppercase text-secondary-400'>
                    Redes
                </p>
                <ul className="flex justify-center space-y-6 flex-col">
                    {socials.map((social, index) => (
                        <li key={index} className="cursor-pointer transition-all duration-300 lg:hover:scale-110">
                            <Link href={social.url}>
                                <p>{social.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="col-span-1">
                <p className='pb-2 uppercase text-secondary-400'>
                    Navegación
                </p>
                <ul className="flex justify-center space-y-6 flex-col">
                    {routes.map((route, index) => (
                        <li key={index} className="cursor-pointer transition-all duration-300 lg:hover:scale-110">
                            <Link href={route.href}>
                                <p>{route.name}</p>
                            </Link>
                        </li>
                    ))}
                    <li className='transition-all duration-300 lg:hover:scale-110 cursor-pointer'>
                        <Link href="/catalogo">
                            <p>Catálogo</p>
                        </Link>
                    </li>
                </ul>
            </section>
            <section className='col-span-3 mt-12'>
                <p className='text-secondary-400 text-center mb-6 lg:mb-0 text-xs lg:text-lg'>
                    <a href="https://www.instagram.com/araf.innovations/">
                        Powered by Araf Innovations &copy; {date.getFullYear()}
                    </a>
                </p>
            </section>
        </footer >
    )
}