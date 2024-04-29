import { Router } from "express";

import { TarefasController } from "../controllers/tarefas";

const router = Router();

router.get("/tarefas", TarefasController.getAll);

router.post(
    "/create",
    TarefasController.createValidation,
    TarefasController.create
);

router.delete(
    "/tarefa",
    TarefasController.deleteValidation,
    TarefasController.Delete
);

router.put(
    "/tarefa",
    TarefasController.updateValidation,
    TarefasController.update
);

export { router };
