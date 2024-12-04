import RubricModel from "../models/RublicModel.js";
import CriteriaModel from "../models/CriteriaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllRubrics = async (req, res) => {
  try {
    const Rubrics = await RubricModel.findAll({
      include: [
        {
          model: CriteriaModel,
          as: "criteria_for_rubric",
        },
      ],
    });
    if (Rubrics.length === 0) {
      return res.status(404).json({ msg: "No se encontraron rubricas!" });
    } else {
      return res.status(200).json({
        Rubrics: Rubrics,
      });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener las rubricas: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al obtener las rubricas!",
    });
  }
};

export const getRubric = async (req, res) => {
  const { id_rubricas } = req.params;
  try {
    const Rubric = await RubricModel.findByPk(id_rubricas, {
      include: [
        {
          model: CriteriaModel,
          as: "criteria_for_rubric",
        },
      ],
    });
    if (Rubric) {
      return res.status(200).json(Rubric);
    } else {
      return res.status(404).json({ msg: "No se ha encontrado la rubrica!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener la rubrica: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al obtener la rubrica!",
    });
  }
};

export const createRubrica = async (req, res) => {
  const { des_rubricas, id_criterio } = req.body;
  try {
    const newRubric = await RubricModel.create(
      {
        des_rubricas: des_rubricas,
        id_criterio: id_criterio,
      },
      {
        logging: console.log,
      }
    );
    if (newRubric) {
      return res.status(201).json({
        msg: "Rubrica registrada correctamente!",
      });
    } else {
      return res
        .status(400)
        .json({ msg: "Ocurrio un error al registrar la rubrica!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al registrar la rubrica: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al registrar la rubrica!",
    });
  }
};

export const updateRubric = async (req, res) => {
  const { id_rubricas } = req.params;
  const { des_rubricas, id_criterio } = req.body;

  try {
    if (!des_rubricas || !id_criterio) {
      return res.status(400).json({
        msg: "Faltan datos necesarios para actualizar la ruubrica!",
      });
    }
    const existingRubric = await RubricModel.findOne({
      where: { id_rubricas: id_rubricas },
    });

    if (!existingRubric) {
      return res.status(404).json({
        msg: "Rubrica no encontrado, no se puede actualizar!",
      });
    }
    // Verificar si los datos son los mismos que ya están almacenados
    if (
      existingRubric.des_rubricas === des_rubricas &&
      existingRubric.id_criterio === id_criterio
    ) {
      return res.status(200).json({
        msg: "Los datos no han cambiado, no se puede actualizar.",
      });
    }

    const updateRubric = await RubricModel.update(
      {
        des_rubricas: des_rubricas,
        id_criterio: id_criterio,
      },
      {
        where: { id_rubricas: id_rubricas },
      }
    );

    if (updateRubric[0] === 0) {
      return res.status(404).json({
        msg: "Error, no se encontró la rubrica a actualizar!",
      });
    } else {
      return res
        .status(200)
        .json({ msg: "Rubrica actualizada correctamente!" });
    }
  } catch (error) {
    console.log(error);

    logger.error(`Ocurrio un error al actualizar la rubrica: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al actualizar la rubrica!",
    });
  }
};

export const deleteRubric = async (req, res) => {
  const { id_rubricas } = req.params;
  try {
    const deletedRubric = await RubricModel.findOne({
      where: { id_rubricas: id_rubricas },
    });
    if (!deletedRubric) {
      return res
        .status(404)
        .json({ msg: "No ha sido encontrado el registro que intenta borrar" });
    } else {
      await deletedRubric.destroy();
      return res.status(200).json({ msg: "Registro eliminado con exito!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al eliminar la rubrica: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al eliminar la rubrica!",
    });
  }
};
