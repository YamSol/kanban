import { RequestHandler } from 'express';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';
import { StatusCodes } from 'http-status-codes';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>,
) => ObjectSchema<any>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {   
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }

      if (key === 'body' && Object.keys(req.body).length === 0) {
        errorsResult['body'] = { 'body': 'At least one Body property is required' }
      };
    });

    if (Object.entries(errorsResult).length == 0) {
      return next(); // PASSED
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult }); // FAILED
    }
  };
