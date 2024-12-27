import { Link } from 'react-router-dom';
import { FaLightbulb, FaHandsHelping, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg mb-12">
        <img src="/public/logoTecnoparque.png" alt="Tecnoparque Tolima" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Tecnoparque Tolima</h1>
          <p className="text-xl md:text-2xl mt-4">Innovación y Desarrollo</p>
        </div>
      </header>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Bienvenido</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          En Tecnoparque Tolima, fomentamos la innovación y el desarrollo a través de la colaboración y el apoyo a nuevas ideas. Únete a nosotros para transformar el futuro.
        </p>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <Link
            to="/about"
            className="block p-6 bg-white text-black  text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaLightbulb size={32} className="mx-auto mb-2 text-green-500" />
            <span className="text-lg">Sobre Nosotros</span>
          </Link>
          <Link
            to="/services"
            className="block p-6 bg-white text-black text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaHandsHelping size={32} className="mx-auto mb-2 text-green-500" />
            <span className="text-lg">Servicios</span>
          </Link>
          <Link
            to="/projects"
            className="block p-6 bg-white text-black text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaProjectDiagram size={32} className="mx-auto mb-2 text-green-500" />
            <span className="text-lg">Proyectos</span>
          </Link>
          <Link
            to="/contact"
            className="block p-6 bg-white text-black text-center rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <FaEnvelope size={32} className="mx-auto mb-2 text-green-500" />
            <span className="text-lg">Contacto</span>
          </Link>
        </div>
      </section>

      <footer className="text-center mt-12">
        <p className="text-gray-600">
          &copy; 2023 Tecnoparque Tolima. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;