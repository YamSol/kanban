import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const j = require("../../../../data/board-data.json");

export const getAll: RequestHandler = (req, res) => {
    res.status(StatusCodes.ACCEPTED).json(j);
}