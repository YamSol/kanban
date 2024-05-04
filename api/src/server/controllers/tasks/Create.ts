import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ITask, ITaskTypeAsString } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';
import { convertTypeToString } from '../../shared/services';

interface IBodyProps extends ITask {}
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      id: yup.number().integer().required(),
      title: yup.string().required(),
      createdAt: yup.date().required(),
      type: yup.number().integer().moreThan(-1).lessThan(4).required(),
    }),
  ),
}));

export const create: RequestHandler = async (req, res) => {
  var task: ITaskTypeAsString = req.body;
  task.type = convertTypeToString(req.body.type);

  var result:number | Error = await TasksProvider.create(task);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({'error': 'Id already exists in database'});
  }

  const taskInDatabase = await TasksProvider.getById(task.id);

  return res.status(StatusCodes.CREATED).send(taskInDatabase);
};
