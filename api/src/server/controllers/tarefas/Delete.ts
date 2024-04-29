import { RequestHandler } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";

interface ITarefa {
    titulo: String;
    data: Date;
    id: Number;
}

export const deleteValidation = validation({
    body: yup.object().shape({
        titulo: yup.string(),
        data: yup.date(),
        id: yup.number().integer(),
    }),
});

export const Delete: RequestHandler = async (req, res) => {
    return res.send("Deleted.");
};
