import CommitteesCriteriaModel from "../models/CommitteCriteriaModel.js";
import { logger } from "../middleware/logMiddleware.js";
import EvaluationCommitteesModel from "../models/EvaluationCommitteesModel.js";
import CriteriaModel from "../models/CriteriaModel.js";
import IdeasModel from "../models/IdeasModel.js";
import ProponentModel from "../models/ProponentModel.js";
import UserModel from "../models/userModel.js";
import SetOfCriteriaModel from "../models/SetOfCriteriaModel.js";

export const getAllCommitteCriteria = async (req, res) => {
  try {
    const CommitteeCriterias = await CommitteesCriteriaModel.findAll({
      include: [
        {
          model: EvaluationCommitteesModel,
          as: "comite_criterios",
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
        },
        {
          model: CriteriaModel,
          as: "criteria_committees",
          include: [
            {
              model: SetOfCriteriaModel,
              as: "criterio",
            },
          ],
        },
      ],
    });
    if (CommitteeCriterias) {
      return res.status(200).json({ CommitteeCriterias: CommitteeCriterias });
    } else {
      return res.status(404).json({ msg: "No se encontraron registros!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error! ${error}`);
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener los registros!" });
  }
};

export const getCommitteCriteria = async (req, res) => {
  const { id_comites_evaluacion } = req.params;
  try {
    const CommitteeCriteria = await CommitteesCriteriaModel.findAll(
      {
        where: { id_comites_evaluación: id_comites_evaluacion},
        include: [
          {
            model: EvaluationCommitteesModel,
            as: "comite_criterios",
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
          },
          {
            model: CriteriaModel,
            as: "criteria_committees",
            include: [
              {
                model: SetOfCriteriaModel,
                as: "criterio",
              },
            ],
          },
        ],
      }
    );
    if (CommitteeCriteria) {
      return res.status(200).json({ CommitteeCriteria: CommitteeCriteria });
    } else {
      return res.status(404).json({ msg: "No se encontro el registro!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener el registro! ${error}`);
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener ell registro!" });
  }
};
