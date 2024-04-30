import { RequestHandler } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

export const createValidation = validation({
    body: yup.object().shape({
        id: yup.number().required().integer(),
        type: yup.number().required().integer(),
        title: yup.string().required(),
        createdAt: yup.date().required(),
    }),
});

export const create: RequestHandler = async (req, res) => {
    return res.send("Created!");
};
