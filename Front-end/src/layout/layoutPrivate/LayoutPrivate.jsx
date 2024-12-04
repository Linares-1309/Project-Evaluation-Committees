import useAuth from "../../hooks/useAuth";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";
import { LiaUsersCogSolid } from "react-icons/lia";
import { IoSettings } from "react-icons/io5";
import { VscLightbulbAutofix } from "react-icons/vsc";
import { RiLogoutCircleFill } from "react-icons/ri";

import { Link, Navigate, Outlet } from "react-router-dom";

const LayoutPrivate = () => {
  const { auth, cargando, cerrarSesion, roleUser } = useAuth();

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
                  <Link to="/admin" className="flex ms-2 md:me-24">
                    <img
                      src="/logoTecnoparque.png"
                      className="h-10 me-3"
                      alt="FlowBite Logo"
                    />
                  </Link>
                </div>
                <Link to="/admin/perfil" className="flex items-center mr-5">
                  <h3 className="font-serif uppercase text-sm font-semibold text-gray-800">
                    {auth?.user?.username || auth?.username}
                  </h3>
                  <div className="flex items-center ms-3">
                    <div>
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-10 h-10 rounded-full"
                          src="/user.png"
                          alt="user photo"
                        />
                      </button>
                    </div>
                    {/* <div
                      className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                    >
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          Name User
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          Email User
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <Link
                            to="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Inicio
                          </Link>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Ajustes
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Cerrar Sesion
                          </a>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </Link>
              </div>
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
              {roleUser === "Admin" ? (
                <ul className="space-y-2 font-medium select-none">
                  <li>
                    <Link
                      to="/admin"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <FaHome size={23} className="text-green-500" />

                      <span className="ms-3">Inicio</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/ideas"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <VscLightbulbAutofix
                        size={23}
                        className="text-green-500"
                      />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Ideas
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/comites"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <FaFileAlt size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Comités
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/proponentes"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <FaUsers size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Proponentes
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/criterios"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <FaStar size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Criterios
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/conjunto-criterios"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <FaClipboardList size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Conjunto Criterios
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/usuarios"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <LiaUsersCogSolid size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Usuarios
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/ajustes"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <IoSettings size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Ajustes
                      </span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <h1>Hola {roleUser}</h1>
              )}
                <ul>
                  <li className="space-y-2 font-medium">
                    <a
                      onClick={cerrarSesion}
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif"
                    >
                      <RiLogoutCircleFill
                        size={23}
                        className="text-green-500"
                      />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Cerrar Sesion
                      </span>
                    </a>
                  </li>
                </ul>
           
            </div>
          </aside>

          <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 h-auto">
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

export default LayoutPrivate;
