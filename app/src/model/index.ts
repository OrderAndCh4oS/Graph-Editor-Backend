import * as Sequelize from "sequelize";
import {UserModel} from "./user-model";
import * as mysql from "../constants/mysql";
import {ModelModel} from "./model-model";
import {NodeModel} from "./node-model";

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

const user: any = UserModel(sequelize, Sequelize);
const model: any = ModelModel(sequelize, Sequelize);
const node: any = NodeModel(sequelize, Sequelize);
user.model = user.hasMany(model, {as: 'models'});
model.user = model.belongsTo(user);
model.node = model.hasMany(node, {as: 'nodes'});
node.model = node.belongsTo(model);


model.addScope('withNodes', {
    include: {
        model: node,
        as: 'nodes'
    }
});

const db = {
    user,
    model,
    node
};

// @ts-ignore
db.Sequelize = Sequelize;
// @ts-ignore
db.sequelize = sequelize;

export default db;
