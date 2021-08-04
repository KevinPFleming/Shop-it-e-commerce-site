const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    //  (HTTP) 500 Internal Server Error server error response code indicates that the server
    //  encountered an unexpected condition that prevented it from fulfilling the request.
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};

        error.message = err.message

        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}