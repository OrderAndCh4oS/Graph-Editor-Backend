import statusCode from "../constants/status-code";

const messageResponse = (res, message, httpStatusCode = statusCode.OK) => {
    res.statusCode = httpStatusCode;

    return res.json({message})
};

export default messageResponse;