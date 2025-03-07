"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categorias } from '@/app/MockData/categorias';

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <section className="hidden bg-primary-500 rounded-md p-4 lg:flex flex-grow min-w-[270px] max-w-sm lg:max-w-md">
            <div className='w-full sticky top-0'>
                <ul className="mt-2 flex flex-col gap-4">
                    {categorias.map((category, index) => (
                        <li key={index} className={`text-sm text-white ${pathname === category.href ? 'font-semibold' : ''}`}>
                            <Link href={category.href}>
                                <button className={`w-full py-4 text-left text-base font-bold text-black px-8 rounded-md transition-all duration-300  ${pathname === category.href ? 'bg-secondary-500 text-white' : 'text-white hover:bg-primary-400'}`}>
                                    {category.name}
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}