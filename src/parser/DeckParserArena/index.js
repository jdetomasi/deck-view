const CRLF = '\n';
const COMMANDER = /^(COMMANDER|COMANDANTE)/;
const COMPANION = /^(COMPANION|COMPAÑERO)/;
const DECK = /^(DECK|MAZO)/;
const SIDEBOARD = 'SIDEBOARD';
const REGEX = /^([0-9]+)\s([^(]*)\s\((.*)\)\s([0-9]+)/;

const getLinesSanitized = (text) => {
    let lines = text.split(CRLF);
    return lines.map(l => l.trim().toUpperCase());
};

const parseLine = (line) => {
    let parsed = line.match(REGEX);
    return {
        count: parsed[1],
        card_name: parsed[2],
        set: parsed[3],
        collector_number: parsed[4],
    }
};

const getCommander = (text) => {
    let lines = getLinesSanitized(text);
    let index = lines.findIndex(line => COMMANDER.test(line));
    if (index >= 0) {
        return parseLine(lines[index + 1]);
    }
};

const getCompanion = (text) => {
    let lines = getLinesSanitized(text);
    let index = lines.findIndex(line => COMPANION.test(line));
    if (index >= 0) {
        return parseLine(lines[index + 1]);
    }
};

const getMainDeck = (text) => {
    let lines = getLinesSanitized(text);
    let deck = [];
    let index = lines.findIndex(line => DECK.test(line));
    for (let i = index + 1; i < lines.length; i++) {
        let line = lines[i];
        if (0 !== line.length) {
            deck.push(parseLine(line));
        } else {
            break;
        }
    }
    return deck;
};

const getSideboard = (text) => {
    let lines = getLinesSanitized(text);
    let sd = [];
    for (let i = lines.indexOf(SIDEBOARD) + 1; i < lines.length; i++) {
        let line = lines[i];
        if (0 !== line.length) {
            sd.push(parseLine(line));
        } else {
            break;
        }
    }
    return sd;
};

const parseDeck = (text) => {
    return {
        companion: getCompanion(text),
        commander: getCommander(text),
        deck: getMainDeck(text),
        sideboard: getSideboard(text)
    }
};

export default {parseDeck}