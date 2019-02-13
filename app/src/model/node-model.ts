import {DataTypes, Sequelize} from "sequelize";
import {text} from "../validation/validation";

export const NodeModel = (sequelize: Sequelize, type: DataTypes) => {
    return sequelize.define(
        'node',
        {
            uuid: {
                type: type.UUID,
                primaryKey: true,
                defaultValue: type.UUIDV4
            },
            id: {
                type: type.STRING(15),
                validate: text(1, 15, 'identifier'),
                allowNull: false,
                defaultValue: '',
            },
            label: {
                type: type.STRING(40),
                validate: text(0, 40, 'label'),
                allowNull: false,
                defaultValue: '',
            },
            prefix: {
                type: type.STRING(5),
                validate: text(0, 5, 'prefix'),
                allowNull: true,
                defaultValue: null,
            },
            suffix: {
                type: type.STRING(5),
                validate: text(0, 5, 'suffix'),
                allowNull: true,
                defaultValue: null,
            },
            title: {
                type: type.STRING(140),
                validate: text(0, 140),
                allowNull: false,
                defaultValue: '',
            },
            color: {
                type: type.STRING(7),
                validate: text(7, 7),
                allowNull: false,
                defaultValue: '#31448d',
            },
            value: {
                type: type.DOUBLE,
                allowNull: true,
                validate: {
                    isDecimal: true
                },
                defaultValue: null,
            },
            conv: {
                type: type.DOUBLE,
                allowNull: false,
                validate: {
                    isDecimal: true
                },
                defaultValue: 1,
            },
            min: {
                type: type.FLOAT,
                allowNull: true,
                defaultValue: null,
            },
            max: {
                type: type.FLOAT,
                allowNull: true,
                defaultValue: null,
            },
            step: {
                type: type.FLOAT,
                allowNull: true,
                defaultValue: null,
            },
            equn: {
                type: type.STRING(100),
                allowNull: true,
                defaultValue: null,
            }
        });
};
