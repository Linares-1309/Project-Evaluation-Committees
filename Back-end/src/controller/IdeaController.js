import IdeasModel from "../models/IdeasModel.js";
import { logger } from "../middleware/logMiddleware.js";
import ProponentModel from "../models/ProponentModel.js";

export const getAllIdeas = async (req, res) => {
  try {
    const ideas = await IdeasModel.findAll({
      include: [
        {
          model: ProponentModel,
          as: "proponente",
        },
      ],
    });
    if (ideas.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron ideas registradas!" });
    } else {
      return res.status(200).json({
        msg:
          ideas.length < 2
            ? `Se encontro ${ideas.length} idea!`
            : `Se encontraron ${ideas.length} ideas!`,
        ideas: ideas,
      });
    }
  } catch (error) {
    console.log(error);

    logger.error(`Ocurrio un error al otener las ideas! ${error}`);
    return res.status(500).json({
      msg: "Ocurrio un error al obtener las ideas!",
    });
  }
};

export const getIdea = async (req, res) => {
  const { id_idea } = req.params;
  try {
    const idea = await IdeasModel.findByPk(id_idea, {
      include: [
        {
          model: ProponentModel,
          as: "proponente",
        },
      ],
    });
    if (idea) {
      return res.status(200).json(idea);
    } else {
      return res.status(404).json({ msg: "Error, no se encontró la idea!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al obtener la idea! ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al obtener la idea!" });
  }
};

export const createNewIdea = async (req, res) => {
  try {
    const NewIdea = await IdeasModel.create({
      ...req.body,
    });
    if (NewIdea) {
      return res.status(201).json({ msg: "Idea registrada con exito!" });
    } else {
      return res
        .status(400)
        .json({ msg: "Ocurrio un error al registrar la idea!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al registrar su nueva idea ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al registrar su nueva idea!" });
  }
};

export const updateIdea = async (req, res) => {
  const { id_idea } = req.params;
  const { nom_idea, estado_idea, des_idea, cal_final, id_proponente } =
    req.body;
  try {
    const update = await IdeasModel.update(
      {
        nom_idea,
        estado_idea,
        des_idea,
        cal_final,
        id_proponente,
      },
      { where: { id_idea: id_idea } }
    );
    if (update === 0) {
      return res
        .status(404)
        .json({ msg: "Error, no encontro la idea a actualizar!" });
    } else {
      return res.status(200).json({ msg: "Idea actualizada correctamente!" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al actualizar la idea! ${error}`);
    return res
      .status(500)
      .json({ msg: "Ocurrio un error al actualizar la idea!" });
  }
};

export const deleteIdea = async (req, res) => {
  const { id_idea } = req.params;
  try {
    const deleted = await IdeasModel.findOne({
      where: {id_idea: id_idea},
    });
    if (deleted) {
      await deleted.destroy();
      return res.status(200).json({ msg: "Idea eliminada con exito!" });
    } else {
      return res
        .status(404)
        .json({ msg: "Error, no se encontro la idea que intenta borrar" });
    }
  } catch (error) {
    logger.error(`Ocurrio un error al eliminar la idea! ${error}`);
    return res.status(500).json("Ocurrio un error al eliminar la idea!");
  }
};
