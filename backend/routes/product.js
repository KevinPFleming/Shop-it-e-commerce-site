const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');


const { 
    getProducts, 
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(authorizeRoles('admin'), isAuthenticatedUser, newProduct);

router.route('/admin/product/:id')
.put(authorizeRoles('admin'), isAuthenticatedUser, updateProduct)
.delete(authorizeRoles('admin'), isAuthenticatedUser, deleteProduct);

module.exports = router;