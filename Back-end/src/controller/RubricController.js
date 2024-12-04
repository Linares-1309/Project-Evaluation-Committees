import RubricModel from "../models/RublicModel.js";
import CriteriaModel from "../models/CriteriaModel.js";
import { logger } from "../middleware/logMiddleware.js";

export const getAllRubrics = async (req, res) => {
  try {
    const Rubrics = await RubricModel.findAll({
      include: [
        {
          model: CriteriaModel,
          as: "criteria-for-rubric",
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
    logger.error(
      `Ocurrio un error al obtener las rubricas: ${error}`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al obtener las rubricas!",
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
      logger.error(
        `Ocurrio un error al registrar la rubrica: ${error}`
      );
      return res.status(500).json({
        msg: "Ocurrio un error al registrar la rubrica!",
      });
    }
  };