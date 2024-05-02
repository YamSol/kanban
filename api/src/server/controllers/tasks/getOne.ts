import { RequestHandler } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { ITarefa } from "./interfaces";
import { StatusCodes } from "http-status-codes";

export const getOneValidation = validation({
    params: yup.object().shape({
        id: yup.number().required().integer(),
    }),
});

export const getOne: RequestHandler = (req, res) => {
    var tarefas = require("../../../../data/tarefas.json");
    const search_id = parseInt(req.params.id);

    for (let id = 0; id < tarefas.length; id++) {
        const tarefa: ITarefa = tarefas[id];
        if (tarefa.id == search_id) {
            return res.json(tarefa);
        }
    }

    return res.status(StatusCodes.NOT_FOUND).json({});
};
