import { RequestHandler } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

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
