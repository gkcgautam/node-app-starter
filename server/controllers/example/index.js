const router = require('express').Router();
const logger = require('@core/logger').getLogger('example');

router.get('/', function(req, res) {
    logger.info('Yo error now', new Error('This is error'));
    logger.warn('This is a message', { 'key': 123 });
    res.send('Hello world!');
});

module.exports = router;
