import * as yup from "yup";
import { RequestHandler } from "express";
import { validation } from "../../shared/middleware";

interface ITarefa {
    titulo: String;
    data: Date;
    id: Number;
}

export const updateValidation = validation({
    body: yup.object().shape({
        titulo: yup.string().notRequired(),
        data: yup.date().notRequired(),
        id: yup.number().integer().notRequired(),
    }),
});

export const update: RequestHandler = async (req, res) => {
    return res.send("Updated.");
};
