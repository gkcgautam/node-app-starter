const platform = require('platform');
const _ = require('lodash');

module.exports = function() {
    const middleware = function platformMiddleware(req, res, next) {
        req.platform = platform.parse(_.get(req, 'headers.user-agent'));
        next();
    };

    return middleware;
};
