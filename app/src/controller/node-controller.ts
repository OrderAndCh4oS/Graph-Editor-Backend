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
        db.model.findByPk(req.params.id).then(model => {
            if (Array.isArray(req.body)) {
                this._model.bulkCreate(req.body).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                    return this._model.findAll({where: {modelId: model.id}});
                }).then(nodes => {
                    return dataResponse(res, nodes);
                }).catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                });
            } else {
                this._model.create(req.body)
                    .then(node => {
                        model.setNodes([node]);
                        return dataResponse(res, node);
                    })
                    .catch(ValidationError, err => {
                        validationErrorResponse(res, err);
                    });
            }
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

    list = (req: Request, res: Response) => {
        this._model.findAndCountAll({where: {modelId: req.params.id}}).then(result => {
            return dataResponse(res, result);
        })
    };
}
