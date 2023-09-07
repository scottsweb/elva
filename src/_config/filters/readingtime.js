// calculate the time to read of a chunk of text (to the nearest minute)
// based on https://www.bobmonsour.com/posts/calculating-reading-time/
const nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });

module.exports = function(text) {
    var content = new String(text);
    const speed = 240; // reading speed in words per minute
  
    // remove all html elements
    var re = /(&lt;.*?&gt;)|(<[^>]+>)/gi;
    var plain = content.replace(re, "");
  
    // replace all newlines and 's with spaces
    var plain = plain.replace(/\s+|'s/g, " ");
  
    // create array of all the words in the post & count them
    var words = plain.split(" ");
    var count = words.length;
  
    // calculate the reading time
    var readingTime = Math.round(count / speed);
    if (readingTime === 0) {
    	return this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.underMinute;
    } else if (readingTime === 1) {
    	return this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.minute;
    } else {
    	return nunjucks.renderString(this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.other, { minutes: readingTime});
    }
};