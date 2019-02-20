import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import {hidePasswordHash} from '../service/password-utilities';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";
import BaseController from "./base-controller";

export default class UserController extends BaseController {

    constructor() {
        super(db.user);
    }

    create = (req: Request, res: Response) => {
        if (req.body.password !== req.body.confirmPassword) {
            return validationErrorResponse(res, {
                errors: [{
                    message: 'Passwords do not match',
                    path: 'password',
                    value: req.body,
                    type: 'Validation Error'
                }]
            });
        }
        db.user.create(req.body)
            .then(user => {
                user = hidePasswordHash(user);
                return dataResponse(res, user);
            })
            .catch(ValidationError, err => {
                return validationErrorResponse(res, err);
            });
    }
    ;
}
