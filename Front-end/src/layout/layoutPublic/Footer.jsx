// Icons
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <footer className="bg-green-500 w-full h-auto lg:flex lg:flex-row lg:space-x-10 sm:flex sm:flex-col sm:space-y-4 p-5">
        <div className="bg-white lg:h-auto lg:w-1/3 py-3 px-7 rounded-xl m-auto flex justify-center flex-col sm:w-3/4 sm:mx-5 sm:my-3 mb-8">
          <h4 className="font-black font-serif text-center sm:text-left">
            Servicio Nacional de Aprendizaje -{" "}
            <span className="text-green-500">SENA</span>
          </h4>
          <h5 className="font-black font-serif text-center sm:text-left">
            Centro Agropecuario La Granja
          </h5>
          <h5 className="font-black font-serif text-center sm:text-left">
            Tecnoparque Tolima
          </h5>
          <p className="text-center sm:text-left">
            Km. 5 Vía Espinal - Ibague Vda. Dindalito (Tolima), Colombia
          </p>
          <p className="text-center sm:text-left">
            Línea de atención (+57 8) 2709600 - Ext. 84820
          </p>
          <div className="flex justify-center sm:justify-start space-x-2 mt-2">
            <a href="https://www.instagram.com/senacomunica/">
              <FaInstagramSquare size={22} />
            </a>
            <a href="https://www.facebook.com/SENA/">
              <FaSquareFacebook size={22} />
            </a>
            <p className="font-mono font-bold">tecnoparque.tolima</p>
          </div>
          <p className="text-center sm:text-left">
            infocenterlagranja@sena.edu.co
          </p>
        </div>

        <div className="lg:w-2/4 h-auto flex flex-col justify-center text-center">
          <div className="flex flex-wrap justify-center gap-4 text-white mb-4">
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
          <div className="roboto-black -tracking-tight text-white">
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
