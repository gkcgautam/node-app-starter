const FORMATS = {
    MP3: 'mp3',
    MP4: 'mp4',
    OGG: 'ogg',
    WAV: 'wav',
};

const FORMAT_MIME_TYPES = {
    [FORMATS.MP3]: 'audio/mpeg',
    [FORMATS.MP4]: 'audio/mp4',
    [FORMATS.OGG]: 'audio/ogg',
    [FORMATS.WAV]: 'audio/vnd.wav',
};

module.exports = {
    FORMATS,
    FORMAT_MIME_TYPES,
};
