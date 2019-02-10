import {createContext, EXPECTED_OPTIONS_KEY} from 'dataloader-sequelize';

import schema from './graphql/schema';
import UserController from './controller/user-controller';
import ModelController from './controller/model-controller';
import AuthenticationController from './controller/authentication-controller';
import AdminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
import db from "./model";

const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        // @ts-ignore
        context: {[EXPECTED_OPTIONS_KEY]: createContext(db.sequelize)}
    }));
    app.post('/register', UserController.register);
    app.post('/login', AuthenticationController.login);
    app.get('/logout', AuthenticationController.logout);
    app.get('/admin', authenticateUser, AdminController.admin);
    app.post('/model', authenticateUser, ModelController.create);
    app.put('/model/:id', authenticateUser, ModelController.update);
    app.delete('/model/:id', authenticateUser, ModelController.destroy);
    app.get('/model', authenticateUser, ModelController.list);
    app.get('/model/:id', authenticateUser, ModelController.detail);
};

export default routes;
