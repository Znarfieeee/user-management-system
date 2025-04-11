module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            // Custom application error
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
        case err.name === 'UnauthorizedError':
            // jwt token authentication error
            return res.status(401).json({ message: 'Unaothorized'});
        default: 
            return res.status(500).json({ message: err.message});
    }
}