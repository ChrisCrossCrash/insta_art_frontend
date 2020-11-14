import React, {useEffect, useState} from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Piece from "./components/Piece";
import {useRouteMatch} from 'react-router-dom';

function App() {

  const [pieces, setPieces] = useState(null);
  const APIRoot = 'http://localhost:8000/api';
  const match = useRouteMatch();

  const loadPieces = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPieces(data);
      });
  };

  useEffect(() => loadPieces(`${APIRoot}${match.url}`), []);

  let background;

  if (pieces) {
    background = `radial-gradient(at 50% 131px, #FFFFFFDD, #FFFFFF00),linear-gradient(#FFFFFF00, white), url(http://localhost:8000${pieces[0].image})`
  }

  return (
    <div className="App">
      <header style={{
        backgroundImage: background,
      }}>
        <h1 style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '7rem',
          margin: 0,
        }}>InstaArt</h1>
      </header>
      <main>
        <Container>
          {pieces && pieces.map((piece, i) => <Piece key={i} piece={piece} index={i}/>)}
        </Container>
      </main>
    </div>
  );
}

export default App;
