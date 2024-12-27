const About = () => {
  return (
    <div className="container mx-auto px-4 py-7 ">
      <header className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-green-600 font-RobotoSlab">
          Sobre Nosotros
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-1">
          Conoce más sobre Tecnoparque Tolima
        </p>
      </header>

      <section className="text-center mb-7">
        <h2 className="text-3xl font-semibold text-gray-800">Nuestra Misión</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-RobotoSlab">
          En Tecnoparque Tolima, nuestra misión es fomentar la innovación y el
          desarrollo a través de la colaboración y el apoyo a nuevas ideas.
          Creemos en el poder de la creatividad y el ingenio para transformar el
          futuro.
        </p>
      </section>

      <section className="text-center mb-7">
        <h2 className="text-3xl font-semibold text-gray-800 font-RobotoSlab">
          Nuestro Equipo
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Contamos con un equipo de profesionales dedicados y apasionados por la
          innovación. Nuestro equipo está comprometido en brindar el mejor apoyo
          y recursos para que las ideas de nuestros participantes se conviertan
          en realidad.
        </p>
      </section>

      <section className="text-center mb-7">
        <h2 className="text-3xl font-semibold text-gray-800 font-RobotoSlab">
          Nuestros Valores
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          En Tecnoparque Tolima, valoramos la creatividad, la colaboración, la
          integridad y la excelencia. Nos esforzamos por crear un entorno donde
          las ideas puedan florecer y los innovadores puedan prosperar.
        </p>
      </section>
    </div>
  );
};

export default About;
