// Iconos del componente
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";
import { MdAttachment } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { VscLightbulbAutofix } from "react-icons/vsc";
import { RiLogoutCircleFill } from "react-icons/ri";

// Librerias
import { Link, Navigate, Outlet } from "react-router-dom";

// Componentes
import useAuth from "../../hooks/useAuth.jsx";

// Variables globales
const URI_FOTOS = import.meta.env.VITE_FOTOS_URL;

// Componente principal
const UserPage = () => {
  // Extraemos la data del usuario
  const { auth, cargando, cerrarSesion } = useAuth();

  // Validamos si hay un error al cargar la pagina
  if (cargando) {
    return (
      <>
        <h1 className="uppercase text-center font-bold">
          No se ha podido cargar la pagina.
        </h1>
        <h1 className="uppercase text-center font-bold">
          Intenta volviendo a recargar
        </h1>
      </>
    );
  }

  return (
    <>
      {auth?.user?.Id_User || auth?.Id_User ? (
        <>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      ></path>
                    </svg>
                  </button>
                  <Link to="/user" className="flex ms-2 md:me-24">
                    <img
                      src="/logoTecnoparque.png"
                      className="h-10 me-3"
                      alt="FlowBite Logo"
                    />
                  </Link>
                </div>
                <Link to="/user/ajustes" className="flex items-center mr-5">
                  <h3 className="font-serif uppercase text-sm font-semibold text-gray-800">
                    {auth?.user?.username || auth?.username}
                  </h3>
                  <div className="flex items-center ms-3">
                    <div>
                      <button
                        type="button"
                        className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 border-2 "
                        aria-expanded="false"
                      >
                        <span className="sr-only">Open Menu</span>
                        <img
                          className="w-12 h-12 rounded-full"
                          src={`${URI_FOTOS}${auth?.user?.userPotho}`}
                          alt="user photo"
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className=" fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            <div className=" h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between shadow-xl">
              {/* <ul className="space-y-2 font-medium select-none mt-4">
                  
                </ul> */}
              <ul className="space-y-2 font-medium select-none mt-4">
                <li>
                  <Link
                    to="/user"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <FaHome size={23} className="text-green-500" />

                    <span className="ms-3">Inicio</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/conjunto-criterios"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <FaClipboardList size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Conjunto Criterios
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/criterios"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <FaStar size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Criterios
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/rubricas"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <MdAttachment size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Rubricas
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/user/proponentes"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <FaUsers size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Proponentes
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/ideas"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <VscLightbulbAutofix size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">Ideas</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/comites"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <FaFileAlt size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Comités
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/ajustes"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <IoSettings size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Ajustes
                    </span>
                  </Link>
                </li>
              </ul>
              <ul>
                <li className="space-y-2 font-medium">
                  <a
                    onClick={cerrarSesion}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                  >
                    <RiLogoutCircleFill size={23} className="text-green-500" />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Cerrar Sesion
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="p-4 sm:ml-64 bg-slate-50 min-h-screen">
            <div className="p-10 bg-slate-50 rounded-lg dark:border-gray-700 mt-14 ">
              <div className="grid grid-cols-1 gap-0.5 mb-4 text-center">
                <Outlet />
              </div>

              <div className="grid grid-cols-2 gap-4"></div>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default UserPage;
