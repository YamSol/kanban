import { RequestHandler } from "express";

const j = require("../../../../data/board-data.json");

export const getAll: RequestHandler = (req, res) => {
    res.json(j);
};
