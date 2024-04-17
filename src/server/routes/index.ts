import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, DEV!');
});

router.post('/teste', (req, res) => {
    console.log(req.params);

    return res.status(StatusCodes.BAD_REQUEST).send(req.body);
});


export { router };