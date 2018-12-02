const config = {
    ENV: process.env.NODE_ENV || 'development',
    IP: process.env.IP || '127.0.0.1',
    PORT: process.env.PORT || 3000,
    MAX_UPLOAD_FILE_SIZE: process.env.MAX_UPLOAD_FILE_SIZE || 10 * 1024 * 1024, // Bytes
    // LOG_DIRECTORY: process.env.APP_LOG_DIRECTORY,
    // DELIVERY_HOST: process.env.APP_DELIVERY_HOST,
    // JWT_SECRET: process.env.APP_JWT_SECRET,
    // AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    // AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    // AWS_REGION: process.env.APP_AWS_REGION,
    // S3_BUCKET: process.env.APP_S3_BUCKET,
};

module.exports = config;
