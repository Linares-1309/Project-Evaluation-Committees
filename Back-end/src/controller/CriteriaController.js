import CriteriaModel from "../models/CriteriaModel.js";
import SetOfCriteriaModel from "../models/SetOfCriteriaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllCriteria = async (req, res) => {
  try {
    const Criteria = await CriteriaModel.findAll({
      include: [
        {
          model: SetOfCriteriaModel,
          as: "criterio",
        },
      ],
    });
    if (Criteria.length === 0) {
      return res.status(404).json({ msg: "No se encontraron criterios!" });
    } else {
      return res.status(200).json({
        msg:
          Criteria.length < 2
            ? `Se encontro ${Criteria.length} criterio de evaluación!`
            : `Se encontraron ${Criteria.length} criterios de evaluación!`,
        Criteria: Criteria,
      });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al obtener los criterios de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al obtener los criterios de evaluación!",
    });
  }
};

export const getCriteria = async (req, res) => {
  const { id_criterio } = req.params;
  try {
    const Criteria = await CriteriaModel.findByPk(id_criterio, {
      include: [
        {
          model: SetOfCriteriaModel,
          as: "criterio",
        },
      ],
    });
    if (Criteria) {
      return res.status(200).json(Criteria);
    } else {
      return res.status(404).json({ msg: "No se ha encontrado el criterio!" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al obtener el criterio de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al obtener el criterio de evaluación!",
    });
  }
};
export const createCriteria = async (req, res) => {
  try {
    const newCriteria = await CriteriaModel.create({
      ...req.body,
    });
    if (newCriteria) {
      return res.status(201).json({
        des_criterio: newCriteria.des_criterio,
        id_conjunto_criterio: newCriteria.id_conjunto_criterio,
        msg: "Criterio de evaluación registrado correctamente!",
      });
    } else {
      return res
        .status(400)
        .json({ msg: "Ocurrio un error al registrar el criterio!" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al registrar el criterio de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al registrar el criterio de evaluación!",
    });
  }
};

export const updateCriteria = async (req, res) => {
  const { id_criterio } = req.params;
  const { des_criterio, id_conjunto_criterio } = req.body;
  try {
    const updateCriteria = await CriteriaModel.update(
      {
        des_criterio,
        id_conjunto_criterio,
      },
      {
        where: id_criterio,
      }
    );
    if (updateCriteria === 0) {
      return res.status(404).json({
        msg: "Error, no se encontro el criterio a actualizar!",
      });
    } else {
      return res
        .status(200)
        .json({ msg: "Criterio actualizado correctamente!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al actualizar el criterio: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al actualizar el criterio!",
    });
  }
};

export const deleteCriteria = async (req, res) => {
  const { id_criterio } = req.params;
  try {
    const deletedCriteria = await CriteriaModel.findOne({
      where: { id_criterio: id_criterio },
    });
    if (!deletedCriteria) {
      return res
        .status(404)
        .json({ msg: "No ha sido encontrado el registro que intenta borrar" });
    } else {
      await deletedCriteria.destroy();
      return res.status(200).json({ msg: "Registro eliminado con exito!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al eliminar el criterio: ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al eliminar el criterio!",
    });
  }
};