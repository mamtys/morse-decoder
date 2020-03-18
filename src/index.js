const {
    MORSE_SYMBOL_TABLE,
    MORSE_TABLE,
    SPECIAL_CHARACTERS
} = require('./config');


function decode(expr) {
    let decoded = '';
    for (let i = 0; i < expr.length - 9; i += 10) {
        let encodedChar = expr.slice(i, i + 10);

        if (encodedChar in SPECIAL_CHARACTERS) {
            console.log(encodedChar, SPECIAL_CHARACTERS[encodedChar])
            decoded += SPECIAL_CHARACTERS[encodedChar];
            continue;
        }

        const regExpString = Object.keys(MORSE_SYMBOL_TABLE)
            .map(el => '(' + String(el) + ')|')
            .join('')
            .slice(0, -1)
        const regExp = new RegExp(regExpString, 'g');


        const morseChar = encodedChar.replace(regExp, (match, ...groups) =>
            //slice to remove index and input arguments
            groups.slice(0, -2).reduce((acc, curr) =>
                acc += MORSE_SYMBOL_TABLE[curr] || '',
                ''
            )
        )
        decoded += MORSE_TABLE[morseChar];
    }
    return decoded;
}


module.exports = {
    decode
}