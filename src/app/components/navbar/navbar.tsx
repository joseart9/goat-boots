import { Button } from "@chakra-ui/react"
import { routes } from "./routes"

export default function Navbar() {
    return (
        <header className="flex flex-row space-x-4 p-2 bg-[#FFBE29] items-center">
            <img src="/logo.webp" alt="Logo GOAT Boots" className="h-20 w-auto" />
            <nav className="flex flex-row justify-between w-full px-8">
                <div className="flex flex-row items-center justify-start w-full space-x-4">
                    {routes.map((route, index) => (
                        <Button key={index} size="xs" variant="solid">
                            {route.name}
                        </Button>
                    ))}
                </div>

                <div className="justify-end">
                    <Button size="xs" variant="solid">Catalogo</Button>
                </div>
            </nav>

        </header>
    )
}