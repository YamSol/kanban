import { RequestHandler } from 'express';
import { TasksProvider } from '../../database/providers/tasks';
// import * as tarefas from '../../../../data/tarefas.json';

export const getAll: RequestHandler = (req, res) => {
  const response = TasksProvider.getAll();
  return res.json(response);
};
