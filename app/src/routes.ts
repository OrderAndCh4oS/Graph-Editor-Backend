import {createContext, EXPECTED_OPTIONS_KEY} from 'dataloader-sequelize';

import UserController from './controller/user-controller';
import ModelController from './controller/model-controller';
import AuthenticationController from './controller/authentication-controller';
import AdminController from './controller/admin-controller';
import {authenticateUser} from "./middleware/authentication-middleware";
import NodeController from "./controller/node-controller";

const routes = (app) => {
    app.get('/', (req, res) => res.json({message: 'Hello World!'}));
    app.post('/register', (new UserController()).create);
    app.post('/login', (new AuthenticationController()).login);
    app.get('/logout', (new AuthenticationController()).logout);
    app.get('/admin', authenticateUser, (new AdminController()).admin);

    app.post('/model', authenticateUser, (new ModelController()).create);
    app.get('/model', authenticateUser, (new ModelController()).list);
    app.put('/model/:id', authenticateUser, (new ModelController()).update);
    app.delete('/model/:id', authenticateUser, (new ModelController()).destroy);
    app.get('/model/:id', authenticateUser, (new ModelController()).detail);

    app.post('/model/:id/node', authenticateUser, (new NodeController()).create);
    app.get('/model/:id/node', authenticateUser, (new NodeController()).list);
    app.put('/node/:id', authenticateUser, (new NodeController()).update);
    app.delete('/node/:id', authenticateUser, (new NodeController()).destroy);
    app.get('/node/:id', authenticateUser, (new NodeController()).detail);
};

export default routes;
