// polyfill to be replaced with CSS when more widely supported 
// text-wrap: pretty or text-wrap: balance (https://caniuse.com/?search=text-wrap%3A)
module.exports = function widont(value) {
    const words = value.split(' ');
    if (words.length > 1) {
        words[words.length - 2] += `&nbsp;${words[words.length - 1]}`;
        words.pop();
    }
    return words.join(' ');
};