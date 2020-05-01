import axios from 'axios';
import { SCRYFALL_COLLECTION_URL } from '../../config'

export const getCards = async (identifiers) => {
    // TODO Chuck search to achive scryfall limit:
    // A maximum of 75 card references may be submitted per request
    let res = await axios.post(SCRYFALL_COLLECTION_URL, { identifiers });
    return res.data;
}