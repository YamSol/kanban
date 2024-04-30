import { RequestHandler } from "express";


export const getAll: RequestHandler = (req, res) => {
    const j = require("../../../../data/board-data.json");
    res.json(j);
};
