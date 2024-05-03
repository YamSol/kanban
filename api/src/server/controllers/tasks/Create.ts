import { RequestHandler } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

export const createValidation = validation({
  body: yup.object().shape({
    id: yup.number().required().integer(),
    type: yup.number().required().integer(),
    title: yup.string().required(),
    createdAt: yup.date().required(),
  }),
});

export const create: RequestHandler = async (req, res) => {
  // console.table(typeof(req.body.title));

  // buscar no db o que foi inserido
  return res.status(StatusCodes.CREATED).json(req.body); // retornar o que estiver no db
};
