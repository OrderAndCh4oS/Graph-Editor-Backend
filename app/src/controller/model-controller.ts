import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";
import BaseController from "./base-controller";

export default class ModelController extends BaseController {

    constructor() {
        super(db.model)
    }

    create = (req: Request, res: Response) => {
        this._model.create(req.body)
            .then(model => {
                // @ts-ignore
                req.user.setModels([model]);
                return dataResponse(res, model);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };
}

