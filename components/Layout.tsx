import Container from 'react-bootstrap/Container'
import Piece from '../components/Piece'
import Link from 'next/link'
import type { LayoutProps } from '../types/instaArtTypes'

export const Layout = ({ apiData }: LayoutProps) => {
  let background

  let pieces = apiData.results

  // TODO: See if it's possible to load this with the Next image loader
  if (pieces) {
    background = `radial-gradient(at 50% 131px, #FFFFFFDD, #FFFFFF00),linear-gradient(#FFFFFF00, white), url(${process.env.NEXT_PUBLIC_API_DOMAIN}${pieces[0].image.url})`
  }

  return (
    <div className='App'>
      <header
        style={{ backgroundImage: background, backgroundPosition: 'center' }}
      >
        <Link href='/'>
          <a className='page-title'>InstaArt</a>
        </Link>
      </header>
      <main>
        <Container>
          {pieces &&
            pieces.map((piece, i) => <Piece key={i} piece={piece} index={i} />)}
        </Container>
        <div className='d-flex justify-content-center align-items-center'>
          {apiData.previous && (
            <Link href={`/${apiData.previous.split(/\/art\//)[1]}`}>
              <a
                className='btn btn-outline-secondary mr-3'
                onClick={() => window.scrollTo(0, 0)}
                style={{ width: '12ch' }}
              >
                Previous
              </a>
            </Link>
          )}
          {apiData.next && (
            <Link href={`/${apiData.next.split(/\/art\//)[1]}`}>
              <a
                className='btn btn-outline-secondary ml-3'
                onClick={() => window.scrollTo(0, 0)}
                style={{ width: '12ch' }}
              >
                Next
              </a>
            </Link>
          )}
        </div>
      </main>
      <footer>
        <div className='d-flex flex-column justify-content-center align-items-center py-3 small text-muted'>
          <p className='m-0'>
            &copy;{new Date().getFullYear()} Zeynep Temerit Kumm and Christopher
            Kumm
          </p>
          <a href='https://www.chriskumm.com' rel='noreferrer'>
            ChrisKumm.com
          </a>
        </div>
      </footer>
    </div>
  )
}
