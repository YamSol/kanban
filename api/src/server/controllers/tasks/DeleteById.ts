import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';

interface IParamProps {
  id?: number;
}
export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required(),
    }),
  ),
}));

export const deleteById: RequestHandler = async (req, res) => {
  // delete task
  const response = await TasksProvider.deleteById(parseInt(req.params.id));

  // error handling
  if (response instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: [response.message] });
  }
  
  // response handling
  if (response === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({ errors: {default: 'Task not found'} });
  } else {
    return res.status(StatusCodes.NO_CONTENT).send();
  }
};
