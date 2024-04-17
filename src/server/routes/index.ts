import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { TarefasController } from './../controllers'


const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, DEV!');
});

router.post('/tarefas', TarefasController.create);


export { router };