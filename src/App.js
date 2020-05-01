import React from 'react';
import { Container, Button } from '@material-ui/core';
import PasteIcon from '@material-ui/icons/InsertDriveFile'
import './App.css';
import { getCards } from './services/CardService';
import { parseDeck } from './parser/DeckParser';

const onClick = async () => {
  const text = await navigator.clipboard.readText();
  const parsed = parseDeck(text);
  // TODO Fetch cards, group, sort, render w/ images, etc
  /*let card = await getCards([{
    "set": "ELD",
    "collector_number": "303"
  }]);*/
}

function App() {
    return (
        <div className="App">
            <Container className="container">
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<PasteIcon />}
                    onClick={onClick}
                >
                    Paste
                </Button>
            </Container>
        </div>
    );
}

export default App;
