import { Router } from 'express';

import { TasksController } from '../controllers/tasks';

const router = Router();

router.get('/tarefas', TasksController.getAll);
router.get(
  '/tarefas/:id',
  TasksController.getByIdValidation,
  TasksController.getById,
);
router.post(
  '/tarefas',
  TasksController.createValidation,
  TasksController.create,
);
router.delete(
  '/tarefas/:id',
  TasksController.deleteById,
  TasksController.deleteByIdValidation,
);
router.put(
  '/tarefas/:id',
  TasksController.updateByIdValidation,
  TasksController.updateById,
);

export { router };
