export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          No tienes acceso a esta página
        </h1>
        <p className="text-gray-600">
          Por favor, inicia sesión para acceder al área de administración.
        </p>
      </div>
    </div>
  );
}
