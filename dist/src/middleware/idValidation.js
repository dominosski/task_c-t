"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const validateId = (req, res, next) => {
    const id = parseInt(req.body.id);
    if (isNaN(id) || id < 10 || id > 20)
        res.status(400).send({ error: 'ID must be between 10 and 20' });
    else {
        next();
    }
};
exports.validateId = validateId;
