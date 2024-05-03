import { RequestHandler } from 'express';
import * as tarefas from '../../../../data/tarefas.json';

export const getAll: RequestHandler = (req, res) => {
  return res.json(tarefas);
};
