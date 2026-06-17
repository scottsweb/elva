import mime from 'mime-types';

export function mimetype(file) {
    return mime.lookup(file);
}
