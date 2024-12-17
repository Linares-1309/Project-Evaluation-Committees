import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 text-center select-none">
          403
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 text-center select-none">
          Acceso Denegado
        </h2>
        <p className="mt-4 text-center text-gray-600">
          No tienes permiso para acceder a esta página. 
          Si crees que esto es un error, contacta al administrador del sistema.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleBackToLogin}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
