import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@heroui/react";

interface CreateProductDrawerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateProductDrawer({
    isOpen,
    onOpenChange
}: CreateProductDrawerProps) {
    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} className="bg-secondary-100">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">Nuevo Producto</DrawerHeader>
                        <DrawerBody>
                            <p>
                                <label>Nombre</label>
                                <input type="text" className="w-full rounded-lg border border-secondary-500" />
                            </p>
                        </DrawerBody>
                        <DrawerFooter>
                            <button className="py-2 px-4 rounded-lg bg-primary-500 hover:bg-primary-400 text-white">
                                Guardar
                            </button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}