import DeckSection from "../DeckSection";
import React from "react";
import Grid from "@material-ui/core/Grid";

function TwoColumnView(props) {
    const { sections } = props;

    const colSize = (arr) => {
        return arr.reduce((r, c) => r + sections[c].length, 0);
    };

    let sectionNames = Object.keys(sections).filter(k => sections[k].length > 0);
    let columnMax = colSize(sectionNames) / 2;
    let leftColumnSections = [];
    let rightColumnSections = [];
    for (let i = 0; i < sectionNames.length; i++) {
        if (colSize(leftColumnSections) < columnMax) {
            leftColumnSections.push(sectionNames[i]);
        } else {
            rightColumnSections.push(sectionNames[i]);
        }
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                {leftColumnSections.map(k => <DeckSection key={k} {...props} section={k} entries={sections[k]} />)}
            </Grid>
            <Grid item xs={6}>
                {rightColumnSections.map(k => <DeckSection key={k} {...props} section={k} entries={sections[k]} />)}
            </Grid>
        </Grid>
    );
}

export default TwoColumnView;