function sleep(durationInMs = 0) {
    return new Promise(resolve => setTimeout(resolve, durationInMs));
}

module.exports = sleep;
