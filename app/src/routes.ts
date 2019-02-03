import {createContext, EXPECTED_OPTIONS_KEY} from 'dataloader-sequelize';

import schema from './graphql/schema';
import UserController from './controller/user-controller';
import TaskController from './controller/task-controller';
import AuthenticationController from './controller/authentication-controller';
import AdminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
import model from "./model";

const graphqlHTTP = require('express-graphql');

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        // @ts-ignore
        context: {[EXPECTED_OPTIONS_KEY]: createContext(model.sequelize)}
    }));
    app.post('/register', UserController.register);
    app.post('/login', AuthenticationController.login);
    app.get('/logout', AuthenticationController.logout);
    app.get('/admin', authenticateUser, AdminController.admin);
    app.post('/task', authenticateUser, TaskController.create);
    app.put('/task/:id', authenticateUser, TaskController.update);
    app.delete('/task/:id', authenticateUser, TaskController.destroy);
    app.get('/task', authenticateUser, TaskController.list);
    app.get('/task/:id', authenticateUser, TaskController.detail);
};

export default routes;
