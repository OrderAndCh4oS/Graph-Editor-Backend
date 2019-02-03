import statusCode from "../constants/status-code";

const validationErrorResponse = (res, err, httpStatusCode = statusCode.BAD_REQUEST) => {
    res.statusCode = httpStatusCode;

    return res.json({
        statusCode: httpStatusCode, errors: err.errors.map(e => {
            return {
                message: e.message,
                field: e.path,
                value: e.value,
                type: e.type,
            }
        })
    })
};

export default validationErrorResponse;