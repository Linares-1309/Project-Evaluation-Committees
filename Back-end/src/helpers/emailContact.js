import nodemailer from "nodemailer";
import { logger } from "../middleware/logMiddleware.js";

export const emailContact = async (datos) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const { username, email, message } = datos;
    
    const mailOptions = {
      from: '"TECNOPARQUE - LA GRANJA" <juandavidlinares2005@gmail.com>',
      to: email,
      subject: "Nueva Solicitud de Contacto",
      text: "Nueva Solicitud de Contacto",
      html: `<p></p>`,
    };

    // Enviar el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email enviado a ${email}: ${info.messageId}`);
    return { Status: true, Message: info.messageId };
  } catch (error) {
    logger.error(
      `Error al enviar el correo a ${datos.email}: ${error.message}`
    );
    return { Status: false, Message: error.message };
  }
};

