const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwToken');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '',
            url: ''
        }
    })
    sendToken(user, 200, res)
})

    

//  Login User => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler('Please enter email address and password', 400))
    }
    // Finding user in database--the + symbol is used because the user.password field is set to 'false' in the userSchema
    const user = await user.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    //  Checks if Password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res)

})

// Logout User => /api/v1/logout
exports.logout = catchAsyncErrors( async(req, res, next) => 
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    },
    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
))
