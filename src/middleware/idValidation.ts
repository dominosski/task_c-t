import { NextFunction, Request, Response } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.body.id)
    if(isNaN(id) || id < 10 || id > 20)
        res.status(400).send({error: 'ID must be between 10 and 20'})
    else{
        next()
    }   
}