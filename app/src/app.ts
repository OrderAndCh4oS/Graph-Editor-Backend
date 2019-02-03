import {config} from 'dotenv';
import routes from './routes';
import model from "./model";
import localStrategy from "./authentication/local-strategy";
import express = require('express');
import cookieSession = require('cookie-session');

const passport = require('passport');

// Todo: Separate Server and App: https://stackoverflow.com/a/53712305/2562137

config();
const app = express();

app.disable('x-powered-by');

app.use(cookieSession({
    name: 'session',
    keys: ['KGUK%EW#o`+z1`gb<@o^3_j!K.W38X?+'],
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    // @ts-ignore
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    // @ts-ignore
    model.user.findByPk(id).then((user) => {
        done(null, user);
    });
});
passport.use(localStrategy);

app.use(express.json());

routes(app);

export default app;
