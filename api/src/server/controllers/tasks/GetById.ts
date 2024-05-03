import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id: number;
}
export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required(),
    }),
  ),
}));

export const getById: RequestHandler = (req, res) => {
  var tarefas = require('../../../../data/tarefas.json');
  const search_id = parseInt(req.params.id);

  const task = tarefas.find((tarefa: any) => tarefa.id === search_id);
  if (task) {
    return res.json(task);
  }

  return res.status(StatusCodes.NOT_FOUND).json({});
};
