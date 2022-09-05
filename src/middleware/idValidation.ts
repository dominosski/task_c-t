import { NextFunction, Request, Response } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    try{
        const id: number = req.body.id;
        if(!id || id < 10 || id > 20)
            throw new Error()
        else{
            next()
        }
    }catch(e){
        res.status(400).send({error: 'ID must be between 10 and 20'})
    }
}
