import {DataTypes, Sequelize} from "sequelize";
import {labelValidation} from "../validation/model-validation";

export const NodeModel = (sequelize: Sequelize, type: DataTypes) => {
    return sequelize.define(
        'node',
        {
            uuid: {
                type: type.UUID,
                primaryKey: true
            },
            id: {
                type: type.STRING(15),
                validate: labelValidation,
                allowNull: false,
                defaultValue: '',
            },
            label: {
                type: type.STRING(15),
                validate: labelValidation,
                allowNull: false,
                defaultValue: '',
            },
            prefix: {
                type: type.STRING(5),
                validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            suffix: {
                type: type.STRING(5),
                validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            title: {
                type: type.STRING(40),
                validate: labelValidation,
                allowNull: false,
                defaultValue: '',
            },
            color: {
                type: type.STRING(7),
                validate: labelValidation,
                allowNull: false,
                defaultValue: '#31448d',
            },
            value: {
                type: type.DOUBLE,
                validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            conv: {
                type: type.DOUBLE, validate: labelValidation,
                allowNull: false,
                defaultValue: 1,
            },
            min: {
                type: type.FLOAT, validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            max: {
                type: type.FLOAT, validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            step: {
                type: type.FLOAT,
                validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            },
            equn: {
                type: type.STRING(100),
                validate: labelValidation,
                allowNull: true,
                defaultValue: null,
            }
        });
};
