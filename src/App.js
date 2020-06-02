import React from 'react';
import {Container} from '@material-ui/core';
import PasteIcon from '@material-ui/icons/InsertDriveFile'
import './App.css';
import {parseDeck} from './parser/DeckParser';
import Snackbar from '@material-ui/core/Snackbar';
import DeckView from "./components/DeckView";
import {getCards} from "./services/CardService";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
}));

function App() {
    const classes = useStyles();
    const [deck, setDeck] = React.useState({});
    const [snackbar, setSnackbar] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const handleCloseSnackbar = () => {
        setSnackbar({});
    };

    const onClick = async () => {
        try {
            setLoading(true);
            const text = await navigator.clipboard.readText();
            const parsed = parseDeck(text);
            const deck = await getCards(parsed);
            setDeck(deck);
        } catch (e) {
            console.error(e);
            setSnackbar({message: "Error trying to parse the deck"});
        }
        setLoading(false);
    };

    return (
        <div className="App">
            <Container className="container">
                <Fab variant="extended" className={classes.fab} onClick={onClick}>
                    <PasteIcon className={classes.extendedIcon} />
                    Paste
                </Fab>
                <DeckView deck={deck} />
                <Snackbar
                    open={snackbar.message}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={snackbar.message}
                />
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress />
                </Backdrop>
            </Container>
        </div>
    );
}

export default App;
