import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";
import BaseController from "./base-controller";

export default class NodeController extends BaseController {

    constructor() {
        super(db.node);
    }

    create = (req: Request, res: Response) => {
        db.model.findById(req.params.id).then(model => {
            this._model.create(req.body)
                .then(node => {
                    model.setNodes([node]);
                    return dataResponse(res, node);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                });
        });
    };
}
