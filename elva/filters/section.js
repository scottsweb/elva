// <!--section:intro-->
// {{ content | section('intro') | safe }}
// Split a single markdown file into multiple, named sections
export default function section(content, sectionName) {
    if (!content || typeof content !== "string") {
        return content;
    }
    
    if (typeof sectionName !== "string" || !sectionName) {
        return '';
    }

    const targetName = sectionName.trim().toLowerCase();
    
    // regex to match section markers with content up to the next section or end of string
    // captures: (1) section names, (2) content until next section marker or end
    const sectionRegex = /<[!]--section:([^>]+)-->([\s\S]*?)(?=<[!]--section|$)/g;
    
    let results = [];
    let match;
    
    // find all sections
    while ((match = sectionRegex.exec(content)) !== null) {
        const namesStr = match[1];
        const sectionContent = match[2];
        const names = namesStr.split(",").map((n) => n.trim().toLowerCase());
        
        // check if any of the names match the target
        if (names.includes(targetName)) {
            results.push(sectionContent);
        }
    }
    
    return results.join("");
}