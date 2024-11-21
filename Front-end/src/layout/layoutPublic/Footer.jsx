import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <>
      {/* <footer className=" flex flex-col justify-end mb-8">
        <p className="text-center font-bold text-lg">
          Calificacion de Proyectos -{" "}
          <span className="text-green-500">SENA</span>
        </p>
        <p className="text-center font-bold text-lg">
          Centro Agropecuario La Granja
        </p>
      </footer> */}
      <footer className="bg-green-500 w-full h-72 mt-3 flex">
        <div className="bg-white h-5/6 w-1/3 py-3 px-7 rounded-xl m-auto flex justify-center flex-col">
          <h4 className="font-black font-serif">
            Servicio Nacional de Aprendizaje -{" "}
            <span className="text-green-500">SENA</span>
          </h4>
          <h5 className="font-black font-serif">
            Centro Agropecuario La Granja
          </h5>
          <h5 className="font-black font-serif">Tecnoparque Tolima</h5>
          <p>Km. 5 Vía Espinal - Ibague Vda. Dindalito (Tolima), Colombia</p>
          <p>Linea de atención (+57 8) 2709600 - Ext. 84820</p>
          <div className="flex space-x-2">
            <a href="https://www.instagram.com/senacomunica/">
              <FaInstagramSquare size={22} />
            </a>
            <a href="https://www.facebook.com/SENA/">
              <FaSquareFacebook size={22} />
            </a>
            <p className="font-mono font-bold">tecnoparque.tolima</p>
          </div>
          <p>infocenterlagranja@sena.edu.co</p>
        </div>
        <div className="w-2/4 h-auto flex flex-col justify-center">
          <div className="flex flex-wrap justify-center gap-4 text-white">
            <a href="https://www.instagram.com/senacomunica/">
              <FaInstagramSquare size={22} />
            </a>
            <a href="https://www.facebook.com/SENA/">
              <FaSquareFacebook size={22} />
            </a>
            <a href="https://twitter.com/SENAComunica">
              <BsTwitterX size={22} />
            </a>
            <a href="https://www.youtube.com/user/SENATV">
              <IoLogoYoutube size={22} />
            </a>
          </div>
          <div className="text-center roboto-black -tracking-tight text-white">
            <p>
              @SENAcomunica <br /> www.sena.edu.co
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
