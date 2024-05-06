import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';

interface IParamProps {
  id?: number;
}
export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(-1),
    }),
  ),
}));

export const getById: RequestHandler = async (req, res) => {
  // get task
  const response = await TasksProvider.getById(parseInt(req.params.id));

  // handle response
  if (response) {
    return res.status(StatusCodes.ACCEPTED).json(response);
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({});
  }
};
