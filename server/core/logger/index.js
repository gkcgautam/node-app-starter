// const moment = require('moment-timezone');
const PrettyError = require('pretty-error');
const ErrorStackParser = require('error-stack-parser');
const winston = require('winston');
const format = winston.format;
const _ = require('lodash');

const config = require('@config');

const IS_DEV_ENV = config.ENV === 'development';
const LOGGERS = {};

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');
pe.skip((traceLine) => {
    if (_.startsWith(traceLine.path, 'internal/modules')) {
        return true;
    }
    return false;
});

const consoleCustomFormat = format.printf(info => {
    if (info.meta) {
        if (info.meta instanceof Error) {
            if (IS_DEV_ENV) {
                info.message = `${info.message}\n\n${pe.render(info.meta)}`;
            } else {
                const parsedStack = ErrorStackParser.parse(info.meta);
                info.message = `${info.message} : ${info.meta.toString()} ${parsedStack[0].toString()}`;
            }
        } else if (_.isObject(info.meta)) {
            info.message = `${info.message} ${JSON.stringify(info.meta)}`;
        }
    }
    return `${info.timestamp} ${info.label ? `[${info.label}] ` : ''}${info.level}: ${info.message}`;
});

const errorStackToStr = format.printf(info => {
    if (info.meta) {
        if (info.meta instanceof Error) {
            const parsedStack = ErrorStackParser.parse(info.meta);
            info.message = `${info.message} : ${info.meta.toString()} ${parsedStack[0].toString()}`;
        }
    }
});

function getLogger(label = 'app') {
    if (!LOGGERS.hasOwnProperty(label)) {
        const consoleFormatters = [
            IS_DEV_ENV && format.colorize(),
            format.label({ label }),
            format.timestamp({
                format: IS_DEV_ENV
                    ? 'hh:mm:ss A'
                    : 'YYYY-MM-DD hh:mm:ss A',
            }),
            format.splat(),
            consoleCustomFormat,
        ].filter(Boolean);

        const fileFormatter = [
            format.splat(),
            format.label({ label }),
            format.timestamp(),
            errorStackToStr,
            format.uncolorize(),
            format.json(),
        ].filter(Boolean);

        LOGGERS[label] = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: format.combine(...consoleFormatters)
                }),
                new winston.transports.File({
                    filename: 'combined.log',
                    format: format.combine(...fileFormatter),
                }),
            ],
        });
    }

    return LOGGERS[label];
}


// logger.info('Yo 2', {key: 'value', key2:'hmm'});
// getLogger().info('Yo error now', new Error('This is error'));

module.exports = {
    getLogger,
};
