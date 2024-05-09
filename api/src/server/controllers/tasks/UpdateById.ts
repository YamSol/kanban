import * as yup from 'yup';
import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { TasksProvider } from '../../database/providers/tasks';

interface IBodyProps {
  title?: string;
  createdAt?: Date;
  id?: number;
  type?: number;
}
interface IParamProps {
  id: number;
}
export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      title: yup.string().optional(),
      createdAt: yup.date().optional(),
      id: yup.number().integer().optional(),
      type: yup.number().integer().optional(),
    }),
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required(),
    }),
  ),
}));

export const updateById: RequestHandler = async (req, res) => {
  // get params
  const id = parseInt(req.params.id);
  const task = req.body;

  // update task
  const response = await TasksProvider.updateById(task, id)

  // handle error
  if (response instanceof Error) {
    return res.send(StatusCodes.INTERNAL_SERVER_ERROR).json({errors : [response.message]})
  }

  // handle response
  if (response === 1) {
    return res.status(StatusCodes.NO_CONTENT).send();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({errors: {default: 'This task doesn\'t exist'}});
  }
};
