module.exports = function() {
    const middleware = function errorMiddleware(error, req, res, next) {
        /* eslint-disable indent */
        switch (error) {
            case 404: {
                res.status(404).send();
                return;
            }

            case 500: {
                res.status(500).send();
                return;
            }
        }
        /* eslint-enable indent */

        next();
    };

    return middleware;
};
