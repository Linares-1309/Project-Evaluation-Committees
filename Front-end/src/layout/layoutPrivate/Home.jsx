import { Link } from "react-router-dom";
import { FaUsers, FaFileAlt, FaClipboardList } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
const HomePrivate = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-center">
        <img
          src="/public/logoTecnoParque.png"
          alt="Tecnoparque Tolima"
          className="mx-auto w-32 h-14 md:w-48 md:h-36 object-contain"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-green-500 font-RobotoSlab drop-shadow-2xl">
          Tecnoparque Tolima
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mt-2 font-medium">
          Comités de Evaluación de Ideas de Innovación
        </p>
      </header>

      <section className="my-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 font-RobotoSlab">
          Bienvenido
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
          En esta plataforma podrás gestionar y evaluar las ideas de innovación
          presentadas en la red Tecnoparque Tolima.
        </p>
      </section>

      <section className="my-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center font-RobotoSlab">
          Acciones Rápidas
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-7">
          <Link
            to="/admin/ideas"
            className="block p-3 w-2/4 md:w-1/4 bg-white text-green-500 text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaFileAlt size={23} className="inline-block mb-1" />
            <span className="ml-2">Ver Ideas</span>
          </Link>
          <Link
            to="/admin/comites"
            className="block p-3 w-2/4 md:w-1/4 bg-white text-green-500 text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaClipboardList size={23} className="inline-block mb-1" />
            <span className="ml-2">Ver Comités</span>
          </Link>
          <Link
            to="/admin/proponentes"
            className="block p-3 w-2/4 md:w-1/4 bg-white text-green-500 text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaUsers size={23} className="inline-block mb-1" />
            <span className="ml-2">Proponentes</span>
          </Link>
          <Link
            to="/admin/ajustes"
            className="block p-3 w-2/4 md:w-1/4 bg-white text-green-500 text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <IoSettings size={23} className="inline-block mb-1" />
            <span className="ml-2">Ajustes</span>
          </Link>
        </div>
      </section>

      <footer className="text-center my-12">
        <p className="text-gray-600">
          &copy; 2023 Tecnoparque Tolima. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default HomePrivate;
