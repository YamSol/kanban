import { RequestHandler } from 'express';
import { TasksProvider } from '../../database/providers/tasks';
import { ITaskTypeAsString } from '../../database/models';
import { StatusCodes } from 'http-status-codes';

export const getAll: RequestHandler = async (req, res) => {
  // get all tasks
  const response: ITaskTypeAsString[] | Error = await TasksProvider.getAll();

  // error handling
  if (response instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ errors: [response.message] });
  }

  // return response
  return res.json({tasks: response});
};
