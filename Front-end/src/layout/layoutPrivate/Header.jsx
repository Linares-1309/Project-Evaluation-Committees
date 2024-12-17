// Librerias
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState("");

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  };

  return (
    <div className="w-full">
      <div className="bg-header shadow py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center lg:pr-8">
            <img
              src="/logoTecnoparque.png"
              className="w-40 drop-shadow-2xl"
              alt="Logo"
            />
          </div>
          <button
            id="dropdownAvatarNameButton"
            data-dropdown-toggle="dropdownAvatarName"
            className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
            type="button"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 me-2 rounded-full"
              src="/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            />
            Bonnie Green
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdownAvatarName"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium ">Pro User</div>
              <div className="truncate">name@flowbite.com</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
            </ul>
            <div className="py-2">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </nav>
        {/* for smaller devcies */}
        <div className="block md:hidden w-full mt-5 ">
          <div
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer px-4 py-3 text-white bg-green-500 rounded flex justify-between items-center w-full"
          >
            <div className="flex space-x-2">
              <span
                id="s1"
                className={`${
                  text.length != 0 ? "" : "hidden"
                } font-semibold text-sm leading-3 uppercase`}
              >
                Seleccionado:{" "}
              </span>
              <p
                id="textClicked"
                className="font-bold uppercase text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer "
              >
                {text ? text : "Inicio"}
              </p>
            </div>
            <svg
              id="ArrowSVG"
              className={`${
                dropDown ? "" : "rotate-180"
              } transform duration-100`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className=" relative">
            <ul
              id="list"
              className={`${
                dropDown ? "hidden" : "block"
              } font-normal text-base leading-4 absolute top-2  w-full flex flex-col rounded shadow-md`}
            >
              <Link
                to="/"
                onClick={() => setSelectedText("Inicio")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Inicio
              </Link>
              <Link
                to="contact"
                onClick={() => setSelectedText("Contacto")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Contacto
              </Link>
              <Link
                to="lineas"
                onClick={() => setSelectedText("Lineas")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Lineas
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
