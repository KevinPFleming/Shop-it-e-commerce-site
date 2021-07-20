const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDataBase = require('../config/database');

const products = require('../data/products');

//  setting dotenv file
dotenv.config({ path: 'backend/config/config.env' });

connectDataBase();

const seedProducts = async() => {
    try {

    await Product.deleteMany();
    console.log('Products are deleted');

    await Product.insertMany(products);
    console.log('All Products Have Been Added');

    process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();