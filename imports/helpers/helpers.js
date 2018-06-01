function replaceURLWithHTMLLinks(text) {
    const re = /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/ig;
    if (text === undefined) return text;
    return text.replace(re, function (match, lParents, url) {
        let rParents = '';
        lParents = lParents || '';

        const lParenCounter = /\(/g;
        while (lParenCounter.exec(lParents)) {
            let m;
            if (m = /(.*)(\.\).*)/.exec(url) ||
                /(.*)(\).*)/.exec(url)) {
                url = m[1];
                rParents = m[2] + rParents;
            }
        }
        return lParents + "<a href='" + url + "'>" + url + "</a>" + rParents;
    });
}

export {
    replaceURLWithHTMLLinks
}