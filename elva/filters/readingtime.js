// calculate the time to read of a chunk of text (to the nearest minute)
// based on https://www.bobmonsour.com/posts/calculating-reading-time/
import translate from './translate.js';

export default function(text) {
    let content = new String(text);
    const speed = 240; // reading speed in words per minute
  
    // remove all html elements
    let re = /(&lt;.*?&gt;)|(<[^>]+>)/gi;
    let plain = content.replace(re, "");
  
    // replace all newlines and 's with spaces
    plain = plain.replace(/\s+|'s/g, " ");
  
    // create array of all the words in the post & count them
    let words = plain.split(" ");
    let count = words.length;
  
    // calculate the reading time
    let readingTime = Math.round(count / speed);
    if (readingTime === 0) {
    	return this.ctx.translations[this.page.lang || this.ctx.lang].readingTime.underMinute;
    } else {
    	return translate.call(this, 'readingTime.count', this.page.lang || this.ctx.lang, { minutes: readingTime });
    }
};
