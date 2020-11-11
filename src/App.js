import React from "react";
import './App.css';
import Container from 'react-bootstrap/Container';
import Piece from "./components/Piece";

function App() {
  const samplePiece = {
    title: "The Dream",
    artist: "Henri Rousseau",
    location: "Museum of Modern Art",
    movements: ["Naive Art", "Primitivism", "Post-Impressionism"],
    imageUrl: "https://picsum.photos/1000",
    wikiUrl: "https://en.wikipedia.org/wiki/The_Dream_(Rousseau_painting)"
  };

  return (
    <div className="App">
      <header>
        <h1 style={{
          fontFamily: '"Josefin Sans", sans-serif',
          fontSize: '7rem',
          margin: 0,
        }}>InstaArt</h1>
      </header>
      <main>
        <Container>
          <Piece piece={samplePiece}/>
        </Container>
      </main>
      {/*<footer>*/}
      {/*  Chris Kumm 2020*/}
      {/*</footer>*/}
    </div>
  );
}

export default App;
