/* eslint-disable react/prop-types */

// Iconos del componente
import { AiOutlineClose } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

function ModalWindow({
  form,
  toggleModal,
  isOpen,
  titleForm,
  resetForm,
  updateTextButton,
}) {
  // Retornamos el HTML de la modal con el Formulario
  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => {
          if (typeof toggleModal === "function") {
            toggleModal();
          }
        }}
        className="text-lg font-serif text-white bg-green-500 font-semibold rounded-md hover:bg-green-600 py-1.5 w-40 flex items-center px-3 mb-4"
        type="button"
      >
        <FaPlusCircle className="mx-1" />
        Agregar
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          id="crud-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center h-screen bg-gray-500 bg-opacity-50 backdrop-blur-sm"
        >
          <div className="relative p-4 w-full max-w-xl h-auto min-h-[200px] max-h-[94vh] ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-500">
              {/* Encabezado del modal */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {titleForm}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    // Resetear el formulario al cerrar el modal
                    if (typeof resetForm === "function") {
                      resetForm();
                    }
                    // Cerrar el modal
                    if (typeof toggleModal === "function") {
                      toggleModal();
                    }
                    // Restaurar el boton al valor inicial
                    if (typeof updateTextButton === "function") {
                      updateTextButton("Enviar");
                    }
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <AiOutlineClose size={16} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Aquí se renderiza el formulario */}
              <div>{form}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWindow;
