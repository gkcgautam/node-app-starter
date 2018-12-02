module.exports = function() {
    function setCacheDuration(duration) {
        this.setHeader('Cache-Control', `public, max-age=${duration}`);
        this.setHeader('Expires', new Date(Date.now() + (duration*1000)).toUTCString());
    }

    return function cacheDurationMiddleware(req, res, next) {
        res.setCacheDuration = setCacheDuration;
        next();
    };
};
