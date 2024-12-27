import { logger } from "../middleware/logMiddleware.js";
import MessageModel from "../models/messageModel.js";

export const createMessage = async (req, res) => {
  try {
    const { des_message, username, email } = req.body;
    const newMessage = await MessageModel.create({
      des_message,
      username,
      email,
    });

    if (newMessage) {
      return res.status(200).json({ msg: "Mensaje Enviado Correctamente!" });
    } else {
      return res.status(400).json({ msg: "Error al enviar el mensaje" });
    }
  } catch (error) {
    logger.error(`Error al crear el mensaje: ${error.message}`);
    res.status(500).json({ Status: false, Message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.findAll();
    if (messages.length === 0) {
      return res.status(400).json({ msg: "No hay mensajes" });
    } else {
      return res.status(200).json(messages);
    }
  } catch (error) {
    logger.error(`Error al obtener los mensajes: ${error.message}`);
    res.status(500).json({ Status: false, Message: error.message });
  }
};

export const getUnreadMessages = async (req, res) => {
  try {
    const messages = await MessageModel.findAll({
      where: { estado: "No Visto" },
    });
    if (messages.length === 0) {
      return res.status(400).json({ msg: "No hay mensajes no vistos" });
    } else {
      return res.status(200).json(messages);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los mensajes no vistos" });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await MessageModel.findByPk(id);
    if (message) {
      return res.status(200).json(message);
    } else {
      return res.status(400).json({ msg: "Mensaje no encontrado" });
    }
  } catch (error) {
    logger.error(`Error al obtener el mensaje: ${error.message}`);
    res.status(500).json({ Status: false, Message: error.message });
  }
};