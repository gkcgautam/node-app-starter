const FORMATS = {
    JPG: 'jpg',
    PNG: 'png',
    WEBP: 'webp',
    GIF: 'gif',
    BMP: 'bmp',
    SVG: 'svg',
};

const FORMAT_MIME_TYPES = {
    [FORMATS.JPG]: 'image/jpeg',
    [FORMATS.PNG]: 'image/png',
    [FORMATS.WEBP]: 'image/webp',
    [FORMATS.GIF]: 'image/gif',
    [FORMATS.BMP]: 'image/bmp',
    [FORMATS.SVG]: 'image/svg+xml',
};

module.exports = {
    FORMATS,
    FORMAT_MIME_TYPES,
};
