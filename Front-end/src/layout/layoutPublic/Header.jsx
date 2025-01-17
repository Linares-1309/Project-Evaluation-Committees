import { useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  let arr = [true, false, false, false, false, false];
  const [style, setStyle] = useState(arr);
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState("");

  const selected = (props) => {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = false;
    }
    newArr[props] = true;
    setStyle(newArr);
  };

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
          <ul className="hidden md:flex flex-auto space-x-2 items-center">
            <Link
              to="/"
              onClick={() => selected(0)}
              className={`${
                style[0]
                  ? "text-black border-b-4 border-green-500"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase font-serif`}
            >
              INICIO
            </Link>
            <Link
              to="contact"
              onClick={() => selected(1)}
              className={`${
                style[1]
                  ? "text-black border-b-4 border-green-500"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase font-serif`}
            >
              Contacto
            </Link>
            <Link
              to="about"
              onClick={() => selected(2)}
              className={`${
                style[2]
                  ? "text-black border-b-4 border-green-500"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase font-serif`}
            >
              Sobre Nosotros
            </Link>
          </ul>
          <div className=" flex space-x-5 justify-center items-center pl-2">
            <Link
              to="/login"
              className="text-black font-medium font-serif items-center flex justify-center flex-col"
              onClick={() => selected(null)}
            >
              <IoLogIn size={28} title="Login" />
              Iniciar Sesion
            </Link>
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
                className="font-bold uppercase text-sm leading-3 focus:outline-none duration-100 cursor-pointer "
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
                to="about"
                onClick={() => setSelectedText("Sobre Nosotros")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Contacto
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
