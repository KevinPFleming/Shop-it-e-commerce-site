const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')
const { registerUser,
        loginUser,
        resetPassword,
        forgotPassword,
        logout,
        getUserProfile,
        updatePassword,
        updateProfile,
        allUsers,
        getUserDetails,
        updateUser,
        deleteUserDetails
    } = require('../controllers/authController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers);
router.route('/admin/user/:id')
.get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails )
.put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUserDetails)

module.exports = router;
