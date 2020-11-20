import React, {useEffect, useState} from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Piece from "./components/Piece";
import {useRouteMatch, Link} from 'react-router-dom';

function App() {

  const [pieces, setPieces] = useState(null);

  // The address in the browser
  const match = useRouteMatch();

  // The API URL
  let piecesUrl = `${process.env.REACT_APP_DOMAIN}/api/art${match.url}`;

  const loadPieces = () => {
    fetch(piecesUrl)
      .then(response => response.json())
      .then(data => {
        setPieces(data);
      });
  };

  useEffect(loadPieces, [piecesUrl]);

  let background;

  if (pieces) {
    background = `radial-gradient(at 50% 131px, #FFFFFFDD, #FFFFFF00),linear-gradient(#FFFFFF00, white), url(${process.env.REACT_APP_DOMAIN}${pieces[0].image})`
  }

  return (
    <div className="App">
      <header style={{
        backgroundImage: background,
      }}>
        <Link
          style={{
            fontFamily: '"Josefin Sans", sans-serif',
            fontSize: '7rem',
            margin: 0,
            textDecoration: 'none',
            color: 'inherit',
          }}
          to='/art'
        >InstaArt</Link>
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
