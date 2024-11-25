import { MdOutlinePassword } from "react-icons/md";
import { FiUser } from "react-icons/fi";


const Settings = () => {
  return (
    <>
      Settings
      <form className="max-w-sm mx-auto space-y-2">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white text-start"
        >
          Documento
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <FiUser className="text-gray-600" size={14} />
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej. 1107008523"
          />
        </div>
        <label
          htmlFor="website-admin"
          className="block mb-2 text-base font-medium text-gray-900 dark:text-white text-start"
        >
          Contraseña
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <MdOutlinePassword className="text-gray-600" size={14} />
          </span>
          <input
            type="text"
            id="website-admin"
            className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ingrese su contraseña"
          />
        </div>
      </form>
    </>
  );
};

export default Settings;
