const mime = require('mime-types');

module.exports = function mimeType(file) {
    return mime.lookup(file);
}