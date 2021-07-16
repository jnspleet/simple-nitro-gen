function Logger() {

}

const cl = {
    yellow: `\x1b[39m\x1b[33m`,
    reset: `\x1b[39m`,
}

Logger.prototype.message = function (message, prefix) {
    console.log(`${cl.yellow}${new Date().toLocaleDateString()} [${new Date().toLocaleTimeString()}] [${prefix}]:${cl.reset} ${message}`);
}

Logger.info = function (message) {
    Logger.prototype.message(message, "INFO");
}

Logger.warn = function (message) {
    Logger.prototype.message(message, "WARNING");
}

Logger.error = function (message) {
    Logger.prototype.message(message, "ERROR");
}

module.exports = Logger;