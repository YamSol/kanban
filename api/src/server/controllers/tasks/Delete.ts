import { RequestHandler } from "express";
import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { StatusCodes } from "http-status-codes";

export const deleteValidation = validation({
    params: yup.object().shape({
        id: yup.number().integer(),
    }),
});

export const Delete: RequestHandler = async (req, res) => {
    return res.status(StatusCodes.NO_CONTENT);
};
