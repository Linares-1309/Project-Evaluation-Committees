import ProponentModel from "../models/ProponentModel.js";
import { logger } from "../middleware/logMiddleware.js";
import { underscoredIf } from "sequelize/lib/utils";

export const getAllProponents = async (req, res) => {
  try {
    const proponents = await ProponentModel.findAll();
    if (proponents.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron proponentes registrados!" });
    } else {
      return res.status(200).json({
        msg:
          proponents.length < 2
            ? `Se encontro ${proponents.length} proponente!`
            : `Se encontraron ${proponents.length} proponentes!`,
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
    const newProponent = await ProponentModel.create({
      ...req.body,
    });
    return res.status(201).json({
      id_proponente: newProponent?.id_proponente,
      nombres_proponente: newProponent?.nombres_proponente,
      apellidos_proponente: newProponent?.apellidos_proponente,
      correo_proponente: newProponent?.correo_proponente,
      telefono_proponente: newProponent?.telefono_proponente,
      msg: "El proponente ha sido registrado correctamente!",
    });
  } catch (error) {
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
    const updateProponent = await ProponentModel.update(
      {
        nombres_proponente,
        apellidos_proponente,
        correo_proponente,
        telefono_proponente,
      },
      {
        where: id_proponente,
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
      where: id_proponente,
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
