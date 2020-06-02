const CREATURE = 'Creature';
const PLANESWALKER = 'Planeswalker';
const INSTANT = 'Instant';
const SORCERY = 'Sorcery';
const ARTIFACT = 'Artifact';
const ENCHANTMENT = 'Enchantment';
const LAND = 'Land';
const SIDEBOARD = 'Sideboard';

export const SUB_SECTIONS = [
    CREATURE,
    PLANESWALKER,
    INSTANT,
    SORCERY,
    ARTIFACT,
    ENCHANTMENT,
    LAND,
    SIDEBOARD
];

const filterCreature = (entries) => entries.filter(e => e.data.type_line.startsWith("Creature"));
const filterPlaneswalker = (entries) => entries.filter(e => e.data.type_line.startsWith("Legendary Planeswalker"));
const filterInstant = (entries) => entries.filter(e => e.data.type_line.startsWith("Instant"));
const filterSorcery = (entries) => entries.filter(e => e.data.type_line.startsWith("Sorcery"));
const filterArtifact = (entries) => entries.filter(e => e.data.type_line.startsWith("Artifact"));
const filterEnchantment = (entries) => entries.filter(e => e.data.type_line.startsWith("Enchantment"));
const filterLand = (entries) => entries.filter(e => e.data.type_line.startsWith("Land") || e.data.type_line.startsWith("Basic Land") );

export const getMainDeckSections = (deck) => {
    let creature = [];
    let planeswalker = [];
    let instant = [];
    let sorcery = [];
    let artifact = [];
    let enchantment = [];
    let land = [];
    let sideboard = [];

    let mainDeckEntries = deck.deck;
    if (mainDeckEntries && mainDeckEntries.length > 0) {
        creature = filterCreature(mainDeckEntries);
        planeswalker = filterPlaneswalker(mainDeckEntries);
        instant = filterInstant(mainDeckEntries);
        sorcery = filterSorcery(mainDeckEntries);
        artifact = filterArtifact(mainDeckEntries);
        enchantment = filterEnchantment(mainDeckEntries);
        land = filterLand(mainDeckEntries);
    }

    let sideboardEntries = deck.sideboard;
    if (sideboardEntries && sideboardEntries.length > 0) {
        sideboard = sideboardEntries;
    }

    return {
        [CREATURE]: creature,
        [PLANESWALKER]: planeswalker,
        [INSTANT]: instant,
        [SORCERY]: sorcery,
        [ARTIFACT]: artifact,
        [ENCHANTMENT]: enchantment,
        [LAND]: land,
        [SIDEBOARD]: sideboard
    };
};