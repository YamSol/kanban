import { Router } from "express";

import { TarefasController } from "../controllers/tarefas";

const router = Router();

router.get("/tarefas", TarefasController.getAll);

router.get(
    "/tarefas/:id", 
    TarefasController.getOneValidation, 
    TarefasController.getOne
);

router.post(
    "/tarefas",
    TarefasController.createValidation,
    TarefasController.create
);

router.delete(
    "/tarefas/:id",
    TarefasController.deleteValidation,
    TarefasController.Delete
);

router.put(
    "/tarefas/:id",
    TarefasController.updateValidation,
    TarefasController.update
);

export { router };
