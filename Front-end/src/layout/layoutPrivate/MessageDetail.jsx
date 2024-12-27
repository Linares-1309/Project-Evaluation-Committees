import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMessageById } from "./Users/UsersFunctions";

const MessageDetail = () => {
  const { id } = useParams();
  const [message, setMessage] = useState(null);

  const { data } = useQuery({
    queryKey: ["message-by-id", id],
    queryFn: () => getMessageById(id),
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      setMessage(data);
    }
  }, [id, data]);

  if (!message) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-500 font-RobotoSlab">
          Detalle del Mensaje
        </h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 font-RobotoSlab">Nombre</h2>
          <p className="text-gray-600">{message.username}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 font-RobotoSlab">Email</h2>
          <p className="text-gray-600">{message.email}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 font-RobotoSlab">Mensaje</h2>
          <p className="text-gray-600">{message.des_message}</p>
        </div>
        <div className="text-right">
          <button
            onClick={() => window.history.back()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageDetail;
