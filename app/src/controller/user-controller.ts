import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import {hidePasswordHash} from '../service/password-utilities';
import model from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";

export default class UserController {
    static register = (req: Request, res: Response) => {
        model.user.create(req.body)
            .then(user => {
                user = hidePasswordHash(user);
                return dataResponse(res, user);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };

    static update = (req, res) => {

    };
}


