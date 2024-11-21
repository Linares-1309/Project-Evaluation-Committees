import nodemailer from "nodemailer";
import { logger } from "../middleware/logMiddleware.js";

export const emailForgotPassword = async (datos) => {
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

    const { email, username, token } = datos;

    const mailOptions = {
      from: '"TECNOPARQUE - LA GRANJA" <juandavidlinares2005@gmail.com>',
      to: email,
      subject: "Reestablece tu Contraseña",
      text: "Reestablece tu Contraseña",
      html: `<p>Hola ${username}, has solicitado reestablecer tu Contraseña.</p>
                <p>Sigue el sigiente enlace para generar una nueva Contraseña: 
                    <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">
                        Reestablecer Contraseña
                    </a>
                </p>
                <p>Si tú no solicitaste este cambio, ignora este mensaje.</p>`,
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
