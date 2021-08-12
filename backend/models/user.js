const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30,'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, "Please enter Password"],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

// Encrypt Password before saving User- Must use FUNCTION keyword-cant use arrow function
userSchema.pre('save', async function (next) {
if(!this.isModified('password')) {
        next()
    }
    // the value 10 creates a "Stronger" password value when at least 10 characters are used
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare User password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//  Generate Password reset Token
userSchema.methods.getResetPasswordToken = function() {

    const resetToken = crypto.randomBytes(20).toString('hex');
    //  Hash and set to ResetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    // set Token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken;
}


module.exports = mongoose.model('User', userSchema);
