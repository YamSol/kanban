import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ITaskCreate } from '../../database/models';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';


export const createValidation = validation((getSchema) => ({
  body: getSchema<ITaskCreate>(
    yup.object().shape({
      title: yup.string().required(),
      type: yup.number().integer().moreThan(-1).lessThan(4).required(),
    }),
  ),
}));

export const create: RequestHandler = async (req, res) => {
  // create task
  var task: ITaskCreate = req.body;
  var result: number | Error = await TasksProvider.create(task);

  // error handling
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [result.message] });
  }

  // get task from database
  const taskInDatabase = await TasksProvider.getById(result);

  // error handling
  if (taskInDatabase instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [taskInDatabase.message] });
  }

  // return task
  return res.status(StatusCodes.CREATED).send(taskInDatabase);
};
