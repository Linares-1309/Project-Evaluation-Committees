// Iconos del componente
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaClipboardList,
  FaStar,
} from "react-icons/fa";
import { MdAttachment } from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { IoSettings } from "react-icons/io5";
import { VscLightbulbAutofix } from "react-icons/vsc";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { TbBellRingingFilled } from "react-icons/tb";

// Librerias
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Componentes
import { getUnreadMessages } from "./Users/UsersFunctions.jsx";
import useAuth from "../../hooks/useAuth.jsx";

// Variables globales
const URI_FOTOS = import.meta.env.VITE_FOTOS_URL;

// Página de administrador
const AdminPage = () => {
  // Extraer la data del usuario
  const { auth, cargando, cerrarSesion, roleUser } = useAuth();

  // Estado para las notificaciones
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notificaciones"],
    queryFn: getUnreadMessages,
  });

  useEffect(() => {
    if (isLoading) {
      setNotifications([]);
    } else if (isError) {
      setNotifications([]);
    } else {
      setNotifications(data);
    }
  }, [isLoading, isError, data]);

  // Manejar la eliminación de una notificación
  const handleRemoveNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id_message !== id)
    );
  };

  const hasNotifications = true;

  // Validar si hay un error al cargar la página
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

  // Retornar el componente
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
                <div className="flex items-center space-x-5">
                  <div
                    className="cursor-pointer relative my-5"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    {hasNotifications ? (
                      <TbBellRingingFilled size={22} color="black" />
                    ) : (
                      <FaBell size={22} color="black" />
                    )}
                  </div>
                  {showNotifications && (
                    <>
                      <div className="grid grid-cols-1 space-y-3 z-50 absolute top-20 right-10 w-80 bg-transparent rounded-lg  dark:bg-gray-800 dark:text-gray-400">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id_message}
                            id="toast-default"
                            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg drop-shadow-xl dark:text-gray-400 dark:bg-gray-800 z-50 select-none"
                            role="alert"
                          >
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-50 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                                />
                              </svg>
                              <span className="sr-only">Fire icon</span>
                            </div>
                            <Link
                              to={`/admin/messages/${notification.id_message}`}

                              onClick={() => setShowNotifications(false)}
                              className="p-2 border-b border-gray-200 block w-full text-gray-800 dark:text-gray-400"
                            >
                              {notification.des_message}
                            </Link>

                            <button
                              type="button"
                              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                              data-dismiss-target="#toast-default"
                              aria-label="Close"
                              onClick={() =>
                                handleRemoveNotification(
                                  notification.id_message
                                )
                              }
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <Link
                    to="/admin/ajustes"
                    className="flex items-center mr-5 select-none"
                  >
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
            </div>
          </nav>

          <aside
            id="logo-sidebar"
            className=" fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            <div className=" h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between shadow-xl">
              {roleUser === "Admin" ? (
                <ul className="space-y-2 font-medium select-none mt-4">
                  <li className="">
                    <Link
                      to="/admin"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                    >
                      <FaHome size={23} className="text-green-500" />

                      <span className="ms-3">Inicio</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/conjunto-criterios"
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
                      to="/admin/criterios"
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
                      to="/admin/rubricas"
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
                      to="/admin/proponentes"
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
                      to="/admin/ideas"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
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
                      to="/admin/usuarios"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
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
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                    >
                      <IoSettings size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Ajustes
                      </span>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 font-medium select-none mt-4">
                  <li>
                    <Link
                      to="/admin"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                    >
                      <FaHome size={23} className="text-green-500" />

                      <span className="ms-3">Inicio</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/ideas"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
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
                      to="/admin/ajustes"
                      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group font-serif focus:ring-1 focus:outline-none focus:ring-green-400"
                    >
                      <IoSettings size={23} className="text-green-500" />
                      <span className="flex-1 ms-3 whitespace-nowrap">
                        Ajustes
                      </span>
                    </Link>
                  </li>
                </ul>
              )}
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

export default AdminPage;
