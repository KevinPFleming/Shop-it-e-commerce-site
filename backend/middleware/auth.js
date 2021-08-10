const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) => {

    const { token } = req.cookies

    if(!token) {
        return next(new ErrorHandler('Cannot access without Login', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()
})