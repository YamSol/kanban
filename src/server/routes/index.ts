import { Router } from "express";

import { TarefasController } from './../controllers'


const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, DEV!');
});

router.post('/tarefas', TarefasController.createBodyValidator, TarefasController.create);


export { router };