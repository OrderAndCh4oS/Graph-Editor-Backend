import errorResponse from "../response/error";

export const authenticateUser = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } else {
        return errorResponse(res, 'Auth failed.', 401)
    }
};