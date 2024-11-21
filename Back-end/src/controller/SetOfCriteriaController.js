import SetOfCriteriaModel from "../models/SetOfCriteriaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllSetOfCriteria = async (req, res) => {
  try {
    const setOfCriteria = await SetOfCriteriaModel.findAll();
    if (setOfCriteria.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron conjuntos de criterios!" });
    } else {
      return res.status(200).json({
        msg:
          setOfCriteria.length <= 1
            ? `Se encontro ${setOfCriteria.length} conjunto de criterios de evaluación!`
            : `Se encontraron ${setOfCriteria.length} conjuntos de criterios de evaluación!`,
        setOfCriteria: setOfCriteria,
      });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al obtener los conjuntos de criterios de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al obtener los conjuntos de criterios de evaluación!",
    });
  }
};

export const getSetOfCriteria = async (req, res) => {
  const { id_conjunto_criterio } = req.params;
  try {
    const setOfCriteria = await SetOfCriteriaModel.findByPk(
      id_conjunto_criterio
    );
    if (setOfCriteria) {
      return res.status(200).json(setOfCriteria);
    } else {
      return res
        .status(404)
        .json({ msg: "No se ha encontrado el conjunto de criterios!" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al obtener el conjunto de criterios de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al obtener el conjunto de criterios de evaluación!",
    });
  }
};

export const createSetOfCriteria = async (req, res) => {
  try {
    const newSetOfCriteria = await CriteriaModel.create({
      ...req.body,
    });
    return res.status(201).json({
      des_conjunto_criterio: newSetOfCriteria.des_conjunto_criterio,
      msg: "Conjunto de criterios de evaluación registrado correctamente!",
    });
  } catch (error) {
    logger.error(
      `Ocurrio un error al registrar el conjunto de criterios de evaluación: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al registrar el conjunto de criterios de evaluación!",
    });
  }
};

export const updateSetOfCriteria = async (req, res) => {
  const { id_conjunto_criterio } = req.params;
  const { des_conjunto_criterio } = req.body;
  try {
    const updateSetOfCriteria = await SetOfCriteriaModel.update(
      {
        des_conjunto_criterio,
      },
      {
        where: { id_conjunto_criterio },
      }
    );
    if (updateSetOfCriteria === 0) {
      return res.status(404).json({
        msg: "Error, no se encontro el conjunto de criterios a actualizar!",
      });
    } else {
      return res
        .status(200)
        .json({ msg: "Conjunto de criterios actualizado correctamente!" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al actualizar el conjunto de criterios: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al actualizar el conjunto de criterios!",
    });
  }
};

export const deleteSetOfCriteria = async (req, res) => {
  const { id_conjunto_criterio } = req.params;
  try {
    const deletedSetOfCriteria = await SetOfCriteriaModel.findOne({
      where: { id_conjunto_criterio: id_conjunto_criterio },
    });
    if (!deletedSetOfCriteria) {
      return res
        .status(404)
        .json({ msg: "No ha sido encontrado el registro que intenta borrar" });
    } else {
      await deletedSetOfCriteria.destroy();
      return res.status(200).json({ msg: "Registro eliminado con exito!" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al eliminar el conjunto de criterios: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al eliminar el conjunto de criterios!",
    });
  }
};
