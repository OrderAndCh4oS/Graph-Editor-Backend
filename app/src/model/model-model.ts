import {DataTypes, Sequelize} from "sequelize";
import {descriptionValidation, titleValidation, fullTextValidation} from "../validation/model-validation";

export const ModelModel = (sequelize: Sequelize, type: DataTypes) => {
    return sequelize.define(
        'model',
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
            },
            fullText: {
                type: type.TEXT,
                validate: fullTextValidation,
                allowNull: false,
                defaultValue: '',
            }
        });
};
