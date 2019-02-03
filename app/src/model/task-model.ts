import {DataTypes, Sequelize} from "sequelize";
import {descriptionValidation, titleValidation} from "../validation/task-validation";

export const TaskModel = (sequelize: Sequelize, type: DataTypes) => {
    return sequelize.define(
        'task',
        {
            title: {
                type: type.STRING(60),
                validate: titleValidation,
                allowNull: false,
                defaultValue: '',
            },
            description: {
                type: type.STRING(255),
                validate: descriptionValidation,
                allowNull: false,
                defaultValue: '',
            }
        });
};
