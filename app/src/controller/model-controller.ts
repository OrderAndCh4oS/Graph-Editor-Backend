import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";

export default class ModelController {
    static create = (req: Request, res: Response) => {
        db.model.create(req.body)
            .then(model => {
                req.user.setModels([model]);
                return dataResponse(res, model);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };

    static update = (req: Request, res: Response) => {
        db.model.findById(req.params.id).then(model =>
            model.update(req.body)
                .then(model => {
                    return dataResponse(res, model);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    static destroy = (req: Request, res: Response) => {
        db.model.findById(req.params.id).then(model =>
            model.update(req.body)
                .then(model => {
                    return dataResponse(res, model);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    static list = (req: Request, res: Response) => {
        db.model.findAndCountAll().then(result => {
            return dataResponse(res, result);
        })
    };

    static detail = (req: Request, res: Response) => {
        db.model.findById(req.params.id).then(model => {
            return dataResponse(res, model);
        })
    };
}

