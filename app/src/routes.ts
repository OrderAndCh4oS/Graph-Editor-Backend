// import {createContext, EXPECTED_OPTIONS_KEY} from 'dataloader-sequelize';

import UserController from './controller/user-controller';
import ModelController from './controller/model-controller';
import AuthenticationController from './controller/authentication-controller';
import AdminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
import NodeController from "./controller/node-controller";

const routes = (app) => {
    app.get('/', (_, res) => res.json({message: 'Hello World!'}));
    app.post('/register', (new UserController()).create);
    app.post('/login', (new AuthenticationController()).login);
    app.get('/logout', (new AuthenticationController()).logout);
    app.get('/admin', authenticateUser, (new AdminController()).admin);

    app.get('/model', (new ModelController()).list);
    app.get('/model/:id', (new ModelController()).detail);
    app.post('/model', authenticateUser, (new ModelController()).create);
    app.put('/model/:id', authenticateUser, (new ModelController()).update);
    app.delete('/model/:id', authenticateUser, (new ModelController()).destroy);

    app.get('/model/:id/node', (new NodeController()).list);
    app.get('/node/:id', (new NodeController()).detail);
    app.post('/model/:id/node', authenticateUser, (new NodeController()).create);
    app.put('/node/:id', authenticateUser, (new NodeController()).update);
    app.delete('/node/:id', authenticateUser, (new NodeController()).destroy);
};

export default routes;
