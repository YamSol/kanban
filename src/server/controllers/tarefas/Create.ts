import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface ITarefa {
    titulo: string;
    data: Date;
}

const bodyValidation: yup.ISchema<ITarefa> = yup.object().shape({
    titulo: yup.string().required(),
    data: yup.date().required()
});

export const create = async (req: Request<{}, {}, ITarefa>, res: Response) => {
    
    let validatedData: ITarefa | undefined;
    try {
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (!error.path) return;

            errors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }

    console.log(validatedData);
    
    return res.send('Create!');
}
