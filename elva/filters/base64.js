export function base64(text) {
    return Buffer.from(text).toString('base64')
};
