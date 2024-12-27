

const Contacto = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600 font-RobotoSlab">Contacto</h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-4">Estamos aquí para ayudarte</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Información de Contacto</h2>
          <p className="text-gray-600 mb-4">Puedes contactarnos a través de los siguientes medios:</p>
          <ul className="text-gray-600">
            <li className="mb-2"><strong>Linea de Atención:</strong>(+57 8) 2709600 - Ext. 84820</li>
            <li className="mb-2"><strong>Email:</strong> infocenterlagranja@sena.edu.co</li>
            <li className="mb-2"><strong>Dirección:</strong> Km. 5 Vía Espinal - Ibague Vda. Dindalito (Tolima), Colombia</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Envíanos un Mensaje</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Nombre</label>
              <input type="text" id="name" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">Mensaje</label>
              <textarea id="message" rows="4" className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300">Enviar</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contacto;