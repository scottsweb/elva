export default function indexer(text) {
    if (!text) return '';
    let lang = this.page.lang || this.ctx.lang;

    // Convert text to all lower case
    text = text.toLowerCase();

    // Remove HTML elements, punctuation, large spaces and trim
    let plain = unescape(text.replace(/<.*?>/gis, ' ')).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()“”""\n\u25A0\u00A0]/g, ' ').replace(/[ ]{2,}/g, ' ').trim();

    // split the text into an array and remove empty items
    let textArray = [...new Set(plain.split(' '))].filter(Boolean);
    
    // filter the array removing stop words and duplicates
    return textArray.filter(word => !this.ctx.stopwords[lang].includes(word)).join(' ');
}