import UserModel from "../models/userModel.js";
import { generateToken } from "../helpers/generateToken.js";
import { generateJWT } from "../helpers/generateJWT.js";
import { emailForgotPassword } from "../helpers/emailForgotPassword.js";
import { logger } from "../middleware/logMiddleware.js";

// Funcion para que el admin pueda ver todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { userType: "Calificador" },
      attributes: { exclude: ["password", "token", "create_time"] },
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron usuarios calificadores registrados!" });
    } else {
      return res.status(200).json({
        msg: `Se encontraron ${users.length} usuarios.`,
        users: users,
      });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener los usuarios: ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener los usuarios!" });
  }
};

// Funcion para obtener un usuario por su Id
export const getUser = async (req, res) => {
  const { Id_User } = req.params;
  try {
    const user = await UserModel.findOne({
      where: { userType: "Calificador", Id_User: Id_User },
      attributes: { exclude: ["password", "token", "create_time"] },
    });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ msg: "El usuario no ha sido encontrado!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener el usuario: ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener el usuario!" });
  }
};

// Funcion para eliminar usuarios
export const deleteUser = async (req, res) => {
  const { Id_User } = req.params;
  try {
    const deleted = await UserModel.destroy({
      where: { Id_User: Id_User },
    });
    if (deleted === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado!" });
    } else {
      return res
        .status(200)
        .json({ msg: "Usuario eliminado satisfactoriamente!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al eliminar el usuario: ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al eliminar el usuario!" });
  }
};

// Funcion para actualizar username
export const updateUser = async (req, res) => {
  const { username } = req.body;
  try {
    const [updateUser] = await UserModel.update(
      {
        username: username,
      },
      {
        where: { Id_User: req.params.Id_User },
      }
    );
    if (updateUser === 0) {
      return res
        .status(404)
        .json({ msg: "Ocurrio un error, usuario no encontrado!" });
    } else {
      return res
        .status(200)
        .json({ msg: "Usuario actualizado satisfactoriamente!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al actualizar el usuario: ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al actualizar el usuario!" });
  }
};

// Funcion para logeo de usuarios
export const login = async (req, res) => {
  const { Id_User, password } = req.body;
  try {
    //  Comprobar si el usuario existe en la base de datos
    const user = await UserModel.findOne({
      where: { Id_User: Id_User },
    });
    if (!user) {
      res
        .status(404)
        .json({ msg: "El usuario no exixte en la base de datos!" });
      return;
    }
    // Comprobar si la contraseña es correcta
    if (await user.verifyPassword(password)) {
      const userString = user.Id_User.toString();
      const Id_UserHash = Buffer.from(userString).toString("base64");
      // Si la contraseña es correcta se retorna los datos del usuario logeado
      res.status(200).json({
        msg: "Login Exitoso, Bienvenid@!",
        Id_User: user.Id_User,
        username: user.username,
        email: user.email,
        token: generateJWT(Id_UserHash, user.userType),
      });
      return;
    } else {
      return res.status(403).json({ msg: "La contraseña es incorrecta!" });
    }
  } catch (error) {
    logger.error("Error al realizar el logeo! ", error);
    res
      .status(500)
      .json({ msg: "Ocurrio un error durante la autenticacion!" });
  }
};

// Funcion para crear las cuentas de los usuarios
export const createUser = async (req, res) => {
  const { Id_User, username, email } = req.body;

  try {
    // Validar que el documento del usuario sea un número.
    if (isNaN(Id_User)) {
      return res
        .status(400)
        .json({ message: "El Documento del usuario debe ser un número." });
    }

    // Validar que el nombre del usuario solo contenga letras.
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nameRegex.test(username)) {
      return res
        .status(400)
        .json({ message: "El Nombre del usuario debe ser solo en letras." });
    }

    // Validar el formato del correo electrónico.
    const emailRegex = /(gmail\.com|hotmail\.com)/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({
          message:
            "El correo electrónico debe ser válido y terminar en @gmail.com o @hotmail.com.",
        });
    }

    // Prevenir usuarios duplicados por correo.
    const emailExist = await UserModel.findOne({
      where: { email: email },
    });
    if (emailExist) {
      return res
        .status(400)
        .json({ message: "El correo ya se encuentra registrado!" });
    }

    // Prevenir usuarios duplicados por documento.
    const documentExist = await UserModel.findOne({
      where: { Id_User: Id_User },
    });
    if (documentExist) {
      return res
        .status(400)
        .json({ message: "El documento ya se encuentra registrado!" });
    }

    // Crear el nuevo usuario.
    const newUser = await UserModel.create({
      ...req.body,
    });

    res.status(201).json({
      email: newUser.email,
      username: newUser.username,
      msg: "Usuario creado exitosamente!",
    });
    return;
  } catch (error) {
    logger.error("Error al crear la cuenta! ", error);
    return res
      .status(500)
      .json({ message: "Ocurrio un error al crear la cuenta." }); // Captura de errores y manejo de excepciones.
  }
};

// Funcion para traer el perfil del usuario
export const profile = async (req, res) => {
  console.log(req.user);
  try {
    const { user } = req;
    res.json({ user }); // Respuesta exitosa con los datos del perfil del usuario.
  } catch (error) {
    logger.error("Error al traer el perfil del usuario!", error);
    return res
      .status(500)
      .json({ message: "Error al traer el perfil del usuario!" }); // Captura de errores y manejo de excepciones.
  }
};

//Funcion para enviar el correo de recuperacion de la contraseña
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Buscar usuario por correo electrónico.
    const userExist = await UserModel.findOne({
      where: { email: email },
    });
    if (!userExist) {
      return res.status(404).json({ msg: "El usuario no existe!" });
    }

    // Generar y asignar un nuevo token de recuperación.
    userExist.token = generateToken();
    await userExist.save();

    // Enviar Email con instrucciones para restablecer la contraseña.
    emailForgotPassword({
      email,
      username: userExist.username,
      token: userExist.token,
    });

    return res.json({ msg: "Hemos enviado un correo con las instrucciones!" });
  } catch (error) {
    logger.error("Error al momento de enviar el correo de recuperación", error);
    return res
      .status(500)
      .json({ msg: "Error al enviar el correo de recuperacón" }); // Captura de errores y manejo de excepciones.
  }
};

//Funcion para comprobar si el token es valido para cambiar la contraseña
export const verifyToken = async (req, res) => {
  const { token } = req.params;
  try {
    // Buscar usuario por token.
    const userToken = await UserModel.findOne({
      where: { token: token },
    });
    if (!userToken) {
      return res.status(404).json({ msg: "Token no válido o no existe!" });
    } else {
      return res.json({ msg: "Token válido, coloca tu nueva contraseña!" });
    }
  } catch (error) {
    logger.error("Error en la verificacion del token: ", error);
    return res.status(500).json({ msg: "Error al verificar el token." }); // Captura de errores y manejo de excepciones.
  }
};

//Funcion para crear la contraseña nueva
export const newPassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Buscar usuario por token.
    const usuario = await UserModel.findOne({
      where: { token: req.params.token },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "Ususario no encontrado!" });
    }

    //Validar que la contraseña no sea igual a la anterior
    if (usuario.password === password) {
      return res
        .status(500)
        .json({ msg: "La contraseña no puede ser igual a la anterior!" });
    }

    // Actualizar el token y la contraseña del usuario.
    usuario.token = null;
    usuario.password = password;
    await usuario.save();

    return res.json({ msg: "Contraseña actualizada correctamente!" });
  } catch (error) {
    logger.error("Error al actualizar la contraseña: ", error);
    return res.status(500).json({ msg: "Error al actualizar la contraseña." }); // Captura de errores y manejo de excepciones.
  }
};
