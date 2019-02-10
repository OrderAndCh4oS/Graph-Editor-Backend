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
        db.user.create(req.body)
            .then(user => {
                user = hidePasswordHash(user);
                return dataResponse(res, user);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };
}


