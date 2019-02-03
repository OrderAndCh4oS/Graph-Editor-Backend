import * as Sequelize from "sequelize";
import {UserModel} from "./user-model";
import * as mysql from "../constants/mysql";
import {TaskModel} from "./task-model";

// Todo: Finish setup from: https://grokonez.com/node-js/sequelize/angular-6-httpclient-node-js-express-restapis-mariadb-example-sequelize-orm-crud-apis-example

const sequelize = new Sequelize(
    mysql.DATABASE, mysql.USER, mysql.PASSWORD,
    {
        dialect: 'mysql',
        host: mysql.HOST,
        port: mysql.PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 30000,
            acquire: 60000,
        },
    });

const user = UserModel(sequelize, Sequelize);
const task = TaskModel(sequelize, Sequelize);
user.task = user.hasMany(task, {as: 'tasks'});

const model = {
    user,
    task
};

// @ts-ignore
model.Sequelize = Sequelize;
// @ts-ignore
model.sequelize = sequelize;

export default model;