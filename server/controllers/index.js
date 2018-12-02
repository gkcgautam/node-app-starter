const router = require('express').Router({ mergeParams: true });

router.use('/example', require('./example'));

module.exports = router;
