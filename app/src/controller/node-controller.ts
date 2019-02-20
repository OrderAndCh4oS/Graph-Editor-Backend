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
        const modelId = req.params.id;
        req.body.map(b => {
            const sql = `
                INSERT INTO 
                   nodes(uuid, id, title, label, prefix, suffix, color, value, conv, min, max, equn, modelId, createdAt, updatedAt) 
                VALUES 
                   (:uuid, :id, :title, :label, :prefix, :suffix, :color, :value, :conv, :min, :max, :equn, :modelId, NOW(), NOW()) 
                ON DUPLICATE KEY UPDATE
                     id = :id,
                     title = :title,
                     label = :label,
                     prefix = :prefix,
                     suffix = :suffix,
                     color = :color,
                     value = :value,
                     conv = :conv,
                     min = :min,
                     max = :max,
                     equn = :equn,
                     modelId = :modelId,
                     updatedAt = NOW();
            `;
            // @ts-ignore
            db.sequelize.query(sql, {replacements: {...b, modelId}}).spread((results, metadata) => {
                // Results will be an empty array and metadata will contain the number of affected rows.
                console.log(results, metadata);
            });
        });
        this._model.findAll({where: {modelId}}).then(nodes => {
            return dataResponse(res, nodes);
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
}
