import mime from 'mime-types';

export default function mimeType(file) {
    return mime.lookup(file);
}