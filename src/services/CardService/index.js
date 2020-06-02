import axios from 'axios';
import {SCRYFALL_COLLECTION_URL} from '../../config'

const getDeckIdentifiers = (deck) => {
    const identifiers = [];
    if (deck.companion) {
        identifiers.push({
                "set": deck.companion.set,
                "collector_number": deck.companion.collector_number
        });
    }
    if (deck.commander) {
        identifiers.push({
            "set": deck.commander.set,
            "collector_number": deck.commander.collector_number
        });
    }
    if (deck.deck && deck.deck.length > 0) {
        identifiers.push(...deck.deck.map(i => {
            return {
                "set": i.set,
                "collector_number": i.collector_number
            }
        }));
    }
    if (deck.sideboard && deck.sideboard.length > 0) {
        identifiers.push(...deck.sideboard.map(i => {
            return {
                "set": i.set,
                "collector_number": i.collector_number
            }
        }));
    }

    return identifiers;
};

const populateScryfallData = (deck, data) => {
    if (deck.companion) {
        deck.companion.data = findEntryData(deck.companion, data);
    }
    if (deck.commander) {
        deck.commander.data = findEntryData(deck.commander, data);
    }
    if (deck.deck && deck.deck.length > 0) {
        deck.deck.forEach(e => {
            e.data = findEntryData(e, data);
        });
    }
    if (deck.sideboard && deck.sideboard.length > 0) {
        deck.sideboard.forEach(e => {
            e.data = findEntryData(e, data);
        });
    }

    return deck;
};

const findEntryData = (deckEntry, data) => {
    return data.find(d => d.set.toUpperCase() === deckEntry.set.toUpperCase() && d.collector_number === deckEntry.collector_number);
};

export const getCards = async (deck) => {
    // TODO Chuck search to achive scryfall limit:
    // A maximum of 75 card references may be submitted per request
    const identifiers = getDeckIdentifiers(deck);
    let res = await axios.post(SCRYFALL_COLLECTION_URL, { identifiers });
    return populateScryfallData(deck, res.data.data);
};