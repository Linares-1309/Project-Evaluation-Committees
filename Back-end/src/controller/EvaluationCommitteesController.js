import EvaluationCommitteesModel from "../models/EvaluationCommitteesModel.js";
import { logger } from "../middleware/logMiddleware.js";
import IdeasModel from "../models/IdeasModel.js";
import SetOfCriteriaModel from "../models/SetOfCriteriaModel.js";
import UserModel from "../models/userModel.js";

export const getAllEvaluationCommittees = async (req, res) => {
  try {
    const evaluationCommittees = await EvaluationCommitteesModel.findAll({
      include: [
        {
          model: IdeasModel,
          as: "ideas",
        },
        {
          model: SetOfCriteriaModel,
          as: "conjunto-criterio",
        },
        {
          model: UserModel,
          as: "user",
        },
      ],
    });
    if (evaluationCommittees) {
      return res
        .status(200)
        .json(
          evaluationCommittees,
          evaluationCommittees.length < 2
            ? `Se encontro ${evaluationCommittees.length} comite de evaluación!`
            : `Se encontraron ${evaluationCommittees.length} comites de evaluación!`
        );
    } else {
      return res
        .status(404)
        .json({ msg: "No se encontraron comites de evaluacion" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener los comités de e  valuación!`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener los comités de evaluación!" });
  }
};

export const getEvaluationCommitte = async (req, res) => {
  const { id_comités_evaluación } = req.params;
  try {
    const EvaluationCommitte = await EvaluationCommitteesModel.findByPk(
      id_comités_evaluación,
      {
        include: [
          {
            model: IdeasModel,
            as: "ideas",
          },
          {
            model: SetOfCriteriaModel,
            as: "conjunto-criterio",
          },
          {
            model: UserModel,
            as: "user",
          },
        ],
      }
    );
    if (EvaluationCommitte) {
      return res.status(200).json(EvaluationCommitte);
    } else {
      return res
        .status(404)
        .json({ msg: "Error, no se encontron el comite de evaluación!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener el comité de evaluación!`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener el comité de evaluación" });
  }
};
export const newEvaluationCommitte = async (req, res) => {
  try {
    const evaluationCommitte = await EvaluationCommitteesModel.create({
      ...req.body,
    });
    if (evaluationCommitte) {
      return res.status(201).json({
        evaluationCommitte,
        msg: "Comite de evaluacion creado con exito!",
      });
    } else {
      return res
        .status(400)
        .json({ msg: "Ocurrio un error al crear el comité de evaluación!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al registrar el comité de evaluación`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al registrar el comité de evaluaión!" });
  }
};

export const updateEvaluationCommitte = async (req, res) => {
  const { id_comités_evaluación } = req.params;
  const { fec_comité_evaluación, id_idea, id_conjunto_criterio, Id_User } =
    req.body;
  try {
    const update = await EvaluationCommitteesModel.update(
      {
        fec_comité_evaluación,
        id_idea,
        id_conjunto_criterio,
        Id_User,
      },
      {
        where: id_comités_evaluación,
      }
    );
    if (update === 0) {
      return res.status(404).json({
        msg: "Ocurrio un error alactualizar el comité de evaluación!",
      });
    } else {
      return res
        .status(200)
        .json({ msg: "Comité de evaluación actualizado con exito" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al actualizar el comité de evaluación!`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al ctualizar el comité de evaluación" });
  }
};

export const deleteEvaluationCommitte = async (req, res) => {
  const { id_comités_evaluación } = req.params;
  try {
    const deleteEvaluationCommitte = EvaluationCommitteesModel.findOne({
      where: id_comités_evaluación,
    });
    if (deleteEvaluationCommitte) {
      await deleteEvaluationCommitte.destroy();
      return res
        .status(200)
        .json({ msg: "Comité de evaluación eliminado con exito!" });
    } else {
      return res
        .status(404)
        .json({ msg: "No se encontro el comité de evaluación a eliminar" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al tratar de eliminar el comité de evaluación!`
    );
    return res.status(500).json({
      msg: "Ocurrio un error al tratar de eliminar el comité de evaluación!",
    });
  }
};
