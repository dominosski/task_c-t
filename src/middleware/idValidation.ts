export const validateId = (req:any, res:any, next:any) => {
    try{
        const id = req.body.id;
        if(!id || id <= 10 || id >= 20)
            throw new Error()
        else{
            next()
        }
    }catch(e){
        res.status(400).send({error: 'ID must be between 10 and 20'})
    }
}
