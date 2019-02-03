import statusCode from "../constants/status-code";

const errorResponse = (res, message = "An unknown error occurred.", httpStatusCode = statusCode.BAD_REQUEST) => {
    res.statusCode = httpStatusCode;

    return res.json({statusCode: httpStatusCode, message})
};

export default errorResponse;