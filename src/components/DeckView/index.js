import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import DeckSection from "../DeckSection";
import TwoColumnView from "../TwoColumnView";
import {getMainDeckSections} from "./service";

const useStyles = makeStyles({
    root: {
        padding: '30px',
        margin: '30px 0 0 0'
    },
    tblHeader: {
        colspan: 2,
        textAlign: 'left',
    },
    img: {
        maxWidth: '336px',
        float: 'right',
    },
});

function DeckView(props) {
    const classes = useStyles();
    const { deck } = props;
    const [ preview, setPreview ] = React.useState("");
    const [ selected, setSelected ] = React.useState({});

    const handleCardFocused = (entry) => {
        setPreview(entry.data.image_uris.normal);
    };

    const handleCardUnfocused = () => {
        if (selected.data) {
            setPreview(selected.data.image_uris.normal);
        }
    };

    const handleSelectEntry = (entry) => {
        setSelected(entry);
    };

    const deckSectionProps = {
        handleCardFocused,
        handleCardUnfocused,
        handleSelectEntry,
    };

    const sections = getMainDeckSections(deck);

    return (
        <Paper elevation={3} className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <Grid container>
                        <Grid item xs={12}>
                            <DeckSection
                                section="Commander"
                                entries={[deck.commander]}
                                {...deckSectionProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DeckSection
                                section="Companion"
                                entries={[deck.companion]}
                                {...deckSectionProps}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TwoColumnView
                                sections={sections}
                                {...deckSectionProps}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <img
                        src={preview}
                        alt=""
                        className={classes.img}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default DeckView;