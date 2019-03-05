import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";
import messageResponse from "../response/message";
import errorResponse from "../response/error";
import statusCode from "../constants/status-code";

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
        this._model.destroy({where: {uuid: req.params.id}})
            .then(deleted => {
                if (deleted !== 1) {
                    return errorResponse(res, 'Not Found', statusCode.NOT_FOUND)
                }
                return messageResponse(res, 'Deleted');
                })
            .catch(Error, err => {
                errorResponse(res, err);
            });
    };

    list = (req: Request, res: Response) => {
        this._model.findAndCountAll().then(result => {
            return dataResponse(res, result);
        })
    };

    detail = (req: Request, res: Response) => {
        const scope = req.query.scope || null;
        this._model.scope(scope).findByPk(req.params.id).then(model => {
            return dataResponse(res, model);
        })
    };
}
