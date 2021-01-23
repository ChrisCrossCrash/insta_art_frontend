import React, {useEffect, useState} from 'react'
import './global.css'
import Container from 'react-bootstrap/Container'
import Piece from './components/Piece'
import {useLocation, Link} from 'react-router-dom'

function App() {

  const [pieces, setPieces] = useState(null)

  // Get the address in the browser
  const currentUrl = useLocation()

  // Get the API URL
  let piecesUrl = `${process.env.REACT_APP_DOMAIN}/api${currentUrl.pathname}`

  const loadPieces = () => {
    console.log(`fetching pieces from ${piecesUrl}`)
    fetch(piecesUrl)
      .then(response => response.json())
      .then(data => setPieces(data))
  }

  useEffect(loadPieces, [piecesUrl])

  let background

  if (pieces) {
    background = `radial-gradient(at 50% 131px, #FFFFFFDD, #FFFFFF00),linear-gradient(#FFFFFF00, white), url(${process.env.REACT_APP_DOMAIN}${pieces[0].image.url})`
  }

  return (
    <div className='App'>
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
  )
}

export default App
