const app = require('./app');
const connectDataBase = require('./config/database');
const dotenv = require('dotenv');

// Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down server die to uncaught exceptions');
    process.exit(1)
})

// Set up config file
dotenv.config({path: 'backend/config/config.env'})

// Connecting to Database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handled unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log('ERROR: ${`err.message}');
    console.log('Shutting down the server due to unhandled Promise Rejections')
    server.on.close(() => {
        process.exit(1)
    })
})