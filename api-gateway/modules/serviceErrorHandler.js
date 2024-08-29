const setupErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        console.error('Error stack:', err.stack);
        console.error('Error message:', err.message);

        const statusCode = err.status || 500;
        const errorResponse = {
            status: 'error',
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        };

        res.status(statusCode).json(errorResponse);
    });
};

module.exports = setupErrorHandler;