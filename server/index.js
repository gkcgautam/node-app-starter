const http = require('http');
const express =  require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const requestIp = require('request-ip');
const requestId = require('express-request-id');
const moduleAlias = require('module-alias');
const trailingSlashMiddleware = require('express-trailing-slash');
require('dotenv').config();
require('http-shutdown').extend();

moduleAlias.addAliases({
    '@server': __dirname,
    '@config': __dirname + '/config',
    '@constants': __dirname + '/constants',
    '@controllers': __dirname + '/controllers',
    '@core': __dirname + '/core',
    '@middlewares': __dirname + '/middlewares',
    '@models': __dirname + '/models',
    '@utils': __dirname + '/utils',
});

const config = require('@config');
const constants = require('@constants');
const controllers = require('@controllers');
const errorMiddleware = require('@middlewares/error');
const platformMiddleware = require('@middlewares/platform');
const cacheDurationMiddleware = require('@middlewares/cache-duration');
const logger = require('@core/logger').getLogger();

module.exports = (async () => {
    const app = express();
    const server = http.createServer(app).withShutdown();

    // Handle JSON body
    app.use(bodyParser.json());

    // Handle urlencoded body
    app.use(bodyParser.urlencoded({ extended: true }));

    // Handle file uploads
    app.use(fileUpload({
        limits: {
            fileSize: config.MAX_UPLOAD_FILE_SIZE,
        },
        abortOnLimit: false,
    }));

    // Security headers
    app.use(helmet({
        contentSecurityPolicy: false,
        expectCt: false,
        dnsPrefetchControl: false,
        frameguard: {
            action: 'sameorigin',
        },
        hidePoweredBy: true,
        hpkp: false,
        hsts: {
            maxAge: constants.time.DURATION_IN_SECS.DAY,
            includeSubDomains: true,
            preload: true,
        },
        ieNoOpen: true,
        noCache: false,
        noSniff: true,
        referrerPolicy: {
            policy: 'same-origin',
        },
        xssFilter: false, // TODO: Configure as per the app
    }));

    // Disable etag
    app.set('etag', false);

    // Add client ip to req.clientIp
    app.use(requestIp.mw());

    // Add request Id
    app.use(requestId());

    // Add trailing slash to URL
    app.use(trailingSlashMiddleware());

    // Add res.setCacheDuration method for setting cache duration headers
    app.use(cacheDurationMiddleware());

    // Add platform details to the request object
    app.use(platformMiddleware());

    // Enables all CORS requests.
    // TODO: Configure as per the app
    app.use(cors());

    // Attach route controllers
    app.use('/', controllers);

    // Handle 404 errors
    app.get('*', (req, res, next) => {
        next(404);
    });

    // Handle all errors
    app.use(errorMiddleware());

    server.on('error', (err) => {
        logger.error('Server error', err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    });

    server.listen(config.PORT, config.IP, () => {
        logger.info(`Listening at http://${config.IP}:${config.PORT}`);
    });

    async function shutdownServer(exitCode) {
        server.shutdown(() => {
            logger.info('HTTP server stopped.');
            // eslint-disable-next-line no-process-exit
            process.exit(exitCode);
        });
    }

    process.on('uncaughtException', (e) => {
        logger.error('uncaughtException. Shutting down server...', e);
        shutdownServer(1);
    });
    process.on('SIGTERM', () => {
        logger.info('SIGTERM received. Shutting down server...');
        shutdownServer(0);
    });
    process.on('SIGINT', () => {
        logger.info('SIGINT received. Shutting down server...');
        shutdownServer(0);
    });
    process.on('message', (msg) => {
        if (msg === 'shutdown') {
            logger.info('Shutdown message received. Shutting down server...');
            shutdownServer(0);
        }
    });

    return app;
})();
