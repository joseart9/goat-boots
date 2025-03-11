"use client";

import {
    useDisclosure,
} from "@heroui/react";

import CreateProductDrawer from "./components/CreateProductDrawer";

export default function AdminHome() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="min-h-screen p-2 w-full">
            <div className="flex w-full items-center justify-between bg-secondary-500 py-3 px-6 rounded-lg shadow-sm text-white gap-6">
                <div className="flex flex-row flex-auto overflow-x-scroll w-full gap-2">
                    <button className="py-2 px-4 rounded-lg bg-primary-500 hover:bg-primary-400 flex flex-shrink-0">
                        Todas las categorias
                    </button>
                </div>
                <div className="flex flex-row w-fit gap-2">
                    <button className="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-400" onClick={onOpen}>
                        Agregar
                    </button>
                    <input placeholder="Buscar por nombre" className="text-secondary-500 rounded-md focus:border focus:border-secondary-500" />
                </div>
            </div>
            <CreateProductDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    )
}