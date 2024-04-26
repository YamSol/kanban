import { RequestHandler } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";

interface ITarefa {
    titulo: string;
    data: Date;
}
interface IFilter {
    filter?: string
}

export const createValidation = validation({
    body: yup.object().shape({
        titulo: yup.string().required(),
        data: yup.date().required(),
    }),
    query: yup.object().shape({
        filter: yup.string(),
    })
});

export const create: RequestHandler = async (req, res) => {   
    // console.log(req.body);
    
    return res.send('Created!');
}
