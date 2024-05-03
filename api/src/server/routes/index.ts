import { Router } from 'express';

import { TarefasController } from '../controllers/tasks';

const router = Router();

router.get('/tarefas', TarefasController.getAll);
router.get(
  '/tarefas/:id',
  TarefasController.getByIdValidation,
  TarefasController.getById,
);
router.post(
  '/tarefas',
  TarefasController.createValidation,
  TarefasController.create,
);
router.delete(
  '/tarefas/:id',
  TarefasController.deleteById,
  TarefasController.deleteByIdValidation,
);
router.put(
  '/tarefas/:id',
  TarefasController.updateByIdValidation,
  TarefasController.updateById,
);

export { router };
