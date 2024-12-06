import EvaluationCommitteesModel from "../models/EvaluationCommitteesModel.js";
import { logger } from "../middleware/logMiddleware.js";
import IdeasModel from "../models/IdeasModel.js";
import UserModel from "../models/userModel.js";
import ProponentModel from "../models/ProponentModel.js";
import CriteriaModel from "../models/CriteriaModel.js";
import CommitteesCriteriaModel from "../models/CommitteCriteriaModel.js";

export const getAllEvaluationCommittees = async (req, res) => {
  try {
    const evaluationCommittees = await EvaluationCommitteesModel.findAll({
      include: [
        {
          model: IdeasModel,
          as: "ideas",
          include: [
            {
              model: ProponentModel,
              as: "proponente",
            },
          ],
        },
        {
          model: UserModel,
          as: "user",
          attributes: { exclude: ["password", "token", "userType"] },
        },
      ],
    });
    if (evaluationCommittees) {
      return res
        .status(200)
        .json({ evaluationCommittees: evaluationCommittees });
    } else {
      return res
        .status(404)
        .json({ msg: "No se encontraron comites de evaluacion" });
    }
  } catch (error) {
    logger.error(
      `Ocurrio un error al obtener los comités de e  valuación! ${error}`
    );
    console.log(error);

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
            include: [
              {
                model: ProponentModel,
                as: "proponente",
              },
            ],
          },
          {
            model: UserModel,
            as: "user",
            attributes: { exclude: ["password", "token", "userType"] },
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
    logger.error(
      `Ocurrio un error al obtener el comité de evaluación! ${error}`
    );
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener el comité de evaluación" });
  }
};
export const newEvaluationCommitte = async (req, res) => {
  const { idIdea, fecComiteEvaluacion, idUser, obsComite, selectedValues } =
    req.body;
  try {
    const evaluationCommitte = await EvaluationCommitteesModel.create({
      fec_comité_evaluación: fecComiteEvaluacion,
      Obs_Comite: obsComite,
      id_idea: idIdea,
      Id_User: idUser,
    });
   const updateIdea = await IdeasModel.findOne({
      where: { id_idea: idIdea}
    })

    if (updateIdea) {
      updateIdea.estado_idea = "Convocado"
    }
    updateIdea.save()

    const criterios = await CriteriaModel.findAll({
      attributes: ["id_criterio"],
    });

    const idsValids = criterios.map((criterio) => criterio.id_criterio);

    const asociaciones = Object.entries(selectedValues)
      .filter(([idCriterio]) => idsValids.includes(parseInt(idCriterio)))
      .map(([idCriterio, calificacion]) => ({
        id_comites_evaluación: evaluationCommitte.id_comites_evaluación,
        id_criterio: parseInt(idCriterio),
        cal_comité_criterios: calificacion,
      }));

    if (asociaciones.length > 0) {
      await CommitteesCriteriaModel.bulkCreate(asociaciones);
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
    }
  } catch (error) {
    console.log(error);
    logger.error(
      `Ocurrio un error al registrar el comité de evaluación ${error}`
    );
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al registrar el comité de evaluaión!" });
  }
};

export const updateEvaluationCommitte = async (req, res) => {
  const { id_comités_evaluación } = req.params;
  const { fec_comité_evaluación, id_idea, Id_User } = req.body;
  try {
    const update = await EvaluationCommitteesModel.update(
      {
        fec_comité_evaluación,
        id_idea,
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
