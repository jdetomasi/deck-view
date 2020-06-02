import React, {Fragment} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    table: {
        tableLayout: 'fixed',
    },
    tableHeader: {
        colspan: 2,
        textAlign: 'left',
    },
    tableCount: {
        textAlign: 'right',
        width: '20px',
        overflow: 'hidden',
        padding: '0 5px 0 0'
    }
});

function DeckSection(props) {
    const classes = useStyles();
    const { section, entries, handleCardFocused, handleCardUnfocused, handleSelectEntry } = props;

    if (entries && entries.length > 0) {
        // sort by cmc
        entries.sort((e1, e2) => e1.data.cmc - e2.data.cmc);
    }

    const preventDefault = (event) => event.preventDefault();

    const handlePopoverOpen = (entry) => () => {
        handleCardFocused(entry);
    };

    const handlePopoverClose = (entry) => () => {
        handleCardUnfocused(entry);
    };

    const handleClickEntry = (entry) => () => {
        handleSelectEntry(entry);
    };

    if (entries && entries.filter(e => e).length > 0) {
        return (
            <Fragment>
                <Typography variant="subtitle2">
                    {section}
                </Typography>
                <table className={classes.table}>
                    <tbody>
                        {entries.filter(e => e).map(e => {
                            return (<tr key={e.data.id}>
                                <td className={classes.tableCount}>
                                    <Typography
                                        variant="body2"
                                        display="block"
                                        onMouseEnter={handlePopoverOpen(e)}
                                        onMouseLeave={handlePopoverClose(e)}
                                        onClick={handleClickEntry(e)}
                                    >
                                        <Link href="#" onClick={preventDefault}>
                                            {e.count}
                                        </Link>
                                    </Typography>
                                </td>
                                <td>
                                    <Typography
                                        variant="body2"
                                        display="block"
                                        onMouseEnter={handlePopoverOpen(e)}
                                        onMouseLeave={handlePopoverClose(e)}
                                        onClick={handleClickEntry(e)}
                                    >
                                        <Link href="#" onClick={preventDefault}>
                                            {e.data.name}
                                        </Link>
                                    </Typography>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </Fragment>
        );
    }

    return null;
}

export default DeckSection;