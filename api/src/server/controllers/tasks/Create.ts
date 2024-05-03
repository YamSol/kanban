import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface ITask {
  id: number;
  type: number;
  title: string;
  createdAt: Date;
}
export const createValidation = validation((getSchema) => ({
  body: getSchema<ITask>(
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
