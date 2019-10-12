import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import db from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";
import BaseController from "./base-controller";
import errorResponse from "../response/error";
import messageResponse from "../response/message";

export default class NodeController extends BaseController {

    constructor() {
        super(db.node);
    }

    create = (req: Request, res: Response) => {
        const modelId = req.params.id;
        const node = req.body;
        node.modelId = modelId;

        this._model.upsert(node)
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
                    return validationErrorResponse(res, err);
                })
        );
    };

    list = (req: Request, res: Response) => {
        this._model.findAndCountAll({where: {modelId: req.params.id}}).then(result => {
            return dataResponse(res, result);
        })
    };

    destroy = (req: Request, res: Response) => {
        this._model.findOne({
            where: {uuid: req.params.id},
            include: {
                model: db.model,
                include: {
                    model: db.user,
                    where: {
                        id: req.user['id']
                    }
                }
            }
        })
            .then(node => {
                node.destroy();
                return messageResponse(res, 'Deleted');
            })
            .catch(Error, err => {
                errorResponse(res, err);
            });
    };
}
