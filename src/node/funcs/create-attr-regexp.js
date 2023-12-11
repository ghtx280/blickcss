export function createAttrRegexp(attr = "class") {
    attr =  attr == "class" ? "(?:class|className)" : attr
    const REGEXP = `\\s+${attr}\\s*=\\s*(["'\`])(.*?)\\1`
    const FLAGS = 'g';

    return new RegExp( REGEXP, FLAGS );
}

