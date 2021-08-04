//  Creates a Child Class from Error Parent Class
class ErrorHandler extends Error{
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        // reports active stack strace at the time of the execution
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler;