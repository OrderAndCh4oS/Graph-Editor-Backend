import errorResponse from "../response/error";
import {hidePasswordHash} from "../service/password-utilities";
import dataResponse from "../response/data";
import messageResponse from "../response/message";

const passport = require('passport');

export default class AuthenticationController {
    static login = (req, res, next) => {
        if (!(req.body.hasOwnProperty('username') && (req.body.hasOwnProperty('password')))) {
            return errorResponse(res, 'Username and Password parameters required in json request')
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) return next(err);
            if (!user) return errorResponse(res, 'Auth failed.', 401);
            user = hidePasswordHash(user);
            req.logIn(user, function (err) {
                if (err) return next(err);
                dataResponse(res, user);
            });
        })(req, res, next)
    };


    static logout = (req, res) => {
        req.logout();
        return messageResponse(res, 'Logged out')
    };
}
