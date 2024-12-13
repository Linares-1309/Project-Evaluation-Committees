import ProponentModel from "../models/ProponentModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllProponents = async (req, res) => {
  try {
    const proponents = await ProponentModel.findAll();
    if (proponents.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron proponentes registrados!" });
    } else {
      return res.status(200).json({
        proponents: proponents,
      });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener los proponentes: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al obtener los proponentes!",
    });
  }
};

export const getProponent = async (req, res) => {
  const { id_proponente } = req.params;

  try {
    const proponent = await ProponentModel.findByPk(id_proponente);
    if (proponent) {
      return res.status(200).json(proponent);
    } else {
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el proponente!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener el proponente: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al obtener el proponente!",
    });
  }
};

export const createNewProponent = async (req, res) => {
  try {
    const documentExist = await ProponentModel.findOne({
      where: { id_proponente: req.body.id_proponente },
    });
    if (documentExist) {
      return res
        .status(400)
        .json({ msg: "El documento ya se encuentra registrado!" });
    }

    const emailExist = await ProponentModel.findOne({
      where: { correo_proponente: req.body.correo_proponente },
    });
    if (emailExist) {
      return res
        .status(400)
        .json({ msg: "El correo ya se encuentra registrado!" });
    }

    const newProponent = await ProponentModel.create({
      ...req.body,
    });

    return res.status(201).json({
      proponent: newProponent,
      msg: "Proponente registrado correctamente!",
    });
  } catch (error) {
    console.log(error);

    logger.error(`Ocurrio un error al registrar el proponente ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al registrar el proponente!",
    });
  }
};

export const updateProponent = async (req, res) => {
  const { id_proponente } = req.params;

  const {
    nombres_proponente,
    apellidos_proponente,
    correo_proponente,
    telefono_proponente,
  } = req.body;
  try {
    const existingProponent = await ProponentModel.findOne({
      where: { id_proponente: id_proponente },
    });

    if (!existingProponent) {
      return res.status(404).json({
        msg: "Proponente no encontrado, no se puede actualizar!",
      });
    }

    if (
      // existingProponent.id_proponente === id_proponente &&
      existingProponent.nombres_proponente === nombres_proponente &&
      existingProponent.apellidos_proponente === apellidos_proponente &&
      existingProponent.correo_proponente === correo_proponente &&
      existingProponent.telefono_proponente === telefono_proponente
    ) {
      return res.status(200).json({
        msg: "Los datos no han cambiado, no se puede actualizar.",
      });
    }

    const updateProponent = await ProponentModel.update(
      {
        nombres_proponente,
        apellidos_proponente,
        correo_proponente,
        telefono_proponente,
      },
      {
        where: { id_proponente: id_proponente },
      }
    );
    if (updateProponent === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontro el registro a actualizar" });
    } else {
      return res.status(200).json({ msg: "Registro actualizado con exito!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al actualizar el proponente: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al actualizar el proponente!",
    });
  }
};

export const deleteProponent = async (req, res) => {
  const { id_proponente } = req.params;
  try {
    const deletedProponent = await ProponentModel.findOne({
      where: { id_proponente },
    });
    if (!deletedProponent) {
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el registro que intenta borrar!" });
    } else {
      await deletedProponent.destroy();
      return res.status(200).json("Registro eliminado con exito!");
    }
  } catch (error) {
    logger.error(`Ocurrio un error al eliminar el proponente: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al eliminar el proponente!",
    });
  }
};
