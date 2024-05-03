import * as yup from 'yup';
import { RequestHandler } from 'express';
import { validation } from '../../shared/middleware';
import { NO_CONTENT, StatusCodes } from 'http-status-codes';

interface IBodyProps {
  title?: string;
  createdAt?: Date;
  id?: number;
  type?: number;
}

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

type IBodyPropsWithAtLeastOne = AtLeastOne<IBodyProps>;

interface IParamProps {
  id: number;
}
export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyPropsWithAtLeastOne>(
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
  return res.status(StatusCodes.NO_CONTENT).send();
};
