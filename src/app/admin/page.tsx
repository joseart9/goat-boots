export default function AdminHome() {
    return (
        <div className="min-h-screen p-2">
            <div className="flex w-full items-center justify-between bg-secondary-500 py-3 px-6 rounded-lg shadow-sm text-white">
                <button className="bg-primary-500 py-2 px-4 rounded-lg">
                    Agregar
                </button>
                <input placeholder="Buscar por nombre" className="text-secondary-500 rounded-md focus:border focus:border-secondary-500" />
            </div>
        </div>
    )
}