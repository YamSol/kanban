import { RequestHandler } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

export const createValidation = validation({
    body: yup.object().shape({
        titulo: yup.string().required(),
        data: yup.date().required(),
        id: yup.number().integer().required(),
    }),
});

export const create: RequestHandler = async (req, res) => {
    return res.send("Created!");
};
