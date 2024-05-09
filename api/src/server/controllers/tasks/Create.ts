import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ITask } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';

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
  // create task
  var task: ITask = req.body;
  var result: number | Error = await TasksProvider.create(task);

  // error handling
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [result.message] });
  }

  // get task from database
  const taskInDatabase = await TasksProvider.getById(task.id);

  // error handling
  if (taskInDatabase instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [taskInDatabase.message] });
  }

  // return task
  return res.status(StatusCodes.CREATED).send(taskInDatabase);
};
