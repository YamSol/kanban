import { Request, Response } from "express";


interface ITarefa {
    titulo: string;
}

export const create = (req: Request<{}, {}, ITarefa>, res: Response) => {

    console.log(req.body);
    

    return res.send('Create!');
}
