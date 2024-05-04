import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ITask } from '../../database/models';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends ITask {}
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      id: yup.number().integer().required(),
      type: yup.number().integer().required(),
      title: yup.string().required(),
      createdAt: yup.date().required(),
    }),
  ),
}));

export const create: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.CREATED).send(req.body);
};
