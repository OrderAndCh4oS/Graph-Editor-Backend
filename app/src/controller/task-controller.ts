import {Request, Response} from 'express';
import {ValidationError} from 'sequelize';
import model from '../model';
import dataResponse from '../response/data';
import validationErrorResponse from "../response/validation-error";

export default class TaskController {
    static create = (req: Request, res: Response) => {
        model.task.create(req.body)
            .then(task => {
                req.user.setTasks([task]);
                return dataResponse(res, task);
            })
            .catch(ValidationError, err => {
                validationErrorResponse(res, err);
            });
    };


    static update = (req: Request, res: Response) => {
        model.task.findById(req.params.id).then(task =>
            task.update(req.body)
                .then(task => {
                    return dataResponse(res, task);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    static destroy = (req: Request, res: Response) => {
        model.task.findById(req.params.id).then(task =>
            task.update(req.body)
                .then(task => {
                    return dataResponse(res, task);
                })
                .catch(ValidationError, err => {
                    validationErrorResponse(res, err);
                })
        );
    };

    static list = (req: Request, res: Response) => {
        model.task.findAndCountAll().then(result => {
            return dataResponse(res, result);
        })
    };

    static detail = (req: Request, res: Response) => {
        model.task.findById(req.params.id).then(task => {
            return dataResponse(res, task);
        })
    };
}

