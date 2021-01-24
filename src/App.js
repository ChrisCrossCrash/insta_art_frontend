import React, {useEffect, useState} from 'react'
import './global.css'
import Container from 'react-bootstrap/Container'
import Piece from './components/Piece'
import {useLocation, Link} from 'react-router-dom'

function App() {

  const [pieces, setPieces] = useState(null)
  const [nextApiUrl, setNextApiUrl] = useState(null)
  const [prevApiUrl, setPrevApiUrl] = useState(null)

  // Get the address in the browser
  const currentUrl = useLocation()

  // Get the API URL
  const piecesApiUrl = new URL(`${process.env.REACT_APP_DOMAIN}/api${currentUrl.pathname}${currentUrl.search}`)

  const loadPieces = () => {
    console.log(`fetching pieces from ${piecesApiUrl.href}`)
    fetch(piecesApiUrl.href)
      .then(response => response.json())
      .then(data => {
        setPieces(data.results)
        setPrevApiUrl(data.previous)
        setNextApiUrl(data.next)
      })
  }

  useEffect(loadPieces, [currentUrl, piecesApiUrl.href])

  let background

  if (pieces) {
    background = `radial-gradient(at 50% 131px, #FFFFFFDD, #FFFFFF00),linear-gradient(#FFFFFF00, white), url(${process.env.REACT_APP_DOMAIN}${pieces[0].image.url})`
  }

  return (
    <div className='App'>
      <header style={{backgroundImage: background, backgroundPosition: 'center'}}>
        <Link className='page-title' to='/art'>InstaArt</Link>
      </header>
      <main>
        <Container>
          {pieces && pieces.map((piece, i) => <Piece key={i} piece={piece} index={i}/>)}
        </Container>
        <div className='d-flex justify-content-center align-items-center'>
          {/* TODO: Make these warnings go away. */}
          {prevApiUrl && <Link
            className='btn btn-outline-secondary mr-3'
            onClick={() => window.scrollTo(0, 0)}
            style={{width: '12ch'}} to={`${currentUrl.pathname}${new URL(prevApiUrl).search}`}
          >Previous</Link>}
          {nextApiUrl && <Link
            className='btn btn-outline-secondary ml-3'
            onClick={() => window.scrollTo(0, 0)}
            style={{width: '12ch'}} to={`${currentUrl.pathname}${new URL(nextApiUrl).search}`}
          >Next</Link>}
        </div>
      </main>
      <footer>
        <div className='d-flex flex-column justify-content-center align-items-center py-3 small'>
          <p className='m-0'>&copy;{new Date().getFullYear()} Christopher Kumm</p>
          <a href='https://www.chriskumm.com' target='_blank' rel='noreferrer'>ChrisKumm.com</a>
        </div>
      </footer>
    </div>
  )
}

export default App
