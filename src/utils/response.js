// Success Response
export const successResponse = (res, message, data = {}, statusCode) => {
    return res.status(statusCode).json({
        status: "Success",
        statusCode,
        message,
        data
    });
};

// Error Response
export const errorResponse = (res, message, statusCode, error = null) => {
    return res.status(statusCode).json({
        status: "Error",
        statusCode,
        message,
        error
    });
};