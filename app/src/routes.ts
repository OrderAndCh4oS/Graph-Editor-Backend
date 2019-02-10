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
    app.post('/register', (new UserController()).create);
    app.post('/login', (new AuthenticationController()).login);
    app.get('/logout', (new AuthenticationController()).logout);
    app.get('/admin', authenticateUser, (new AdminController()).admin);
    app.post('/model', authenticateUser, (new ModelController()).create);
    app.put('/model/:id', authenticateUser, (new ModelController()).update);
    app.delete('/model/:id', authenticateUser, (new ModelController()).destroy);
    app.get('/model', authenticateUser, (new ModelController()).list);
    app.get('/model/:id', authenticateUser, (new ModelController()).detail);
};

export default routes;
