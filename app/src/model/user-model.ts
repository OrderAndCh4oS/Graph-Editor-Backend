import {DataTypes, Sequelize} from "sequelize";
import {passwordHash, verifyPassword} from "../service/password-utilities";
import {passwordValidation, usernameValidation} from "../validation/user-validation";

export const UserModel = (sequelize: Sequelize, type: DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            username: {
                type: type.STRING(44),
                validate: usernameValidation,
                allowNull: false,
                defaultValue: '',
            },
            password: {
                type: type.STRING,
                validate: passwordValidation,
                allowNull: false,
                defaultValue: '',
            }
        },
        {
            indexes: [{
                unique: true,
                fields: ['username']
            }],
            defaultScope: {
                attributes: {
                    exclude: ['password']
                }
            },
            scopes: {
                withPassword: {
                    attributes: {},
                }
            }
        });

    // @ts-ignore
    User.prototype.validPassword = verifyPassword;
    User.beforeCreate(passwordHash);
    User.beforeUpdate(passwordHash);

    return User;
};

