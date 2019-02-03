import statusCode from "../constants/status-code";

const dataResponse = (res, data, httpStatusCode = statusCode.OK) => {
    res.statusCode = httpStatusCode;

    return res.json({data})
};

export default dataResponse;