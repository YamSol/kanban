import { Router } from 'express';

import { TasksController } from '../controllers/tasks';

const router = Router();

router.get('/tasks', TasksController.getAll);
router.get('/tasks/:id', TasksController.getByIdValidation, TasksController.getById);
router.post('/tasks', TasksController.createValidation, TasksController.create);
router.delete('/tasks/:id', TasksController.deleteById, TasksController.deleteByIdValidation);
router.put('/tasks/:id', TasksController.updateByIdValidation, TasksController.updateById);

export { router };
