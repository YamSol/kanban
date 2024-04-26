import { Router } from "express";

import { TarefasController } from './../controllers'


const router = Router();

router.get(
    '/',
    TarefasController.getAll
)

router.post(
    '/tarefas', 
    TarefasController.createValidation,
    TarefasController.create
);

export { router };