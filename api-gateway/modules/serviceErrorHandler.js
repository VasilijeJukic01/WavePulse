const setupErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
};

module.exports = setupErrorHandler;