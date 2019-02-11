import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";

export default class BaseController {
    protected _model;

    constructor(model) {
        this._model = model;
    }

    create = (req: Request, res: Response) => {
        this._model.create(req.body)
            .then(model => {
                return dataResponse(res, model);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };

    update = (req: Request, res: Response) => {
        this._model.findByPk(req.params.id).then(model =>
            model.update(req.body)
                .then(model => {
                    return dataResponse(res, model);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    destroy = (req: Request, res: Response) => {
        this._model.findByPk(req.params.id).then(model =>
            model.update(req.body)
                .then(model => {
                    return dataResponse(res, model);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    list = (req: Request, res: Response) => {
        this._model.findAndCountAll().then(result => {
            return dataResponse(res, result);
        })
    };

    detail = (req: Request, res: Response) => {
        this._model.findById(req.params.id).then(model => {
            return dataResponse(res, model);
        })
    };
}
