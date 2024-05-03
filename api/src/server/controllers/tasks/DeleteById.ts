import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id: number;
}
export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(-1),
    }),
  ),
}));

export const deleteById: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.NO_CONTENT).send();
};
