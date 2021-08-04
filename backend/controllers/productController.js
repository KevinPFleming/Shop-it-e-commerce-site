const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Create new product within /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors (async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

// Get ALL products at /api/v1/products
exports.getProducts = catchAsyncErrors (async(req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
})

// Get SINGLE product details at /api/v1/proct/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404));
    }
        res.status(200).json({
        success: true,
        product
    })
})

//  Update Product in /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404));
        }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product from ADMIN from /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404));
        }
    
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product has been deleted"
    })
})