import React, {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/cjs/Card'
import Button from 'react-bootstrap/cjs/Button'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/cjs/Modal'
import {Link} from 'react-router-dom'
import TextBox from './TextBox'

export default function Piece(props) {
  const piece = props.piece
  const index = props.index

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  return (
    <Row style={{marginBottom: 100}}>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        size='xl'
      >
        <img
          src={`${process.env.REACT_APP_DOMAIN}${piece.image.url}`}
          height={piece.image.height}
          width={piece.image.width}
          alt={piece.title}
          style={{
            objectFit: 'contain',
            height: '90vh',
            width: '100%',
          }}
          onClick={handleCloseModal}
        />
      </Modal>

      {/* Swap the image and info columns based on if the index is even or odd. */}
      <Col xs={12} md={{span: 6, order: index % 2}}>
        <Image
          loading='lazy'
          src={`${process.env.REACT_APP_DOMAIN}${piece.image.url}`}
          height={piece.image.height}
          width={piece.image.width}
          alt={piece.title}
          fluid
          style={{
            boxShadow: '5px 5px 10px #00000022',
            cursor: 'pointer',
          }}
          onClick={handleShowModal}
        />
      </Col>

      <Col>
        <Card style={{boxShadow: '5px 5px 10px #00000022'}}>
          <TextBox btnClassName='btn btn-secondary'>
            <Card.Body>
              <Card.Title style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
                {piece.title}

                {/* Render a wiki button only if a wiki link is provided. */}
                {piece.wiki_url &&
                <Button as='a' variant='outline-dark' aria-label='Wikipedia' size='sm' href={piece.wiki_url}
                        rel='noreferrer' target='_blank'>
                  <svg xmlns='http://www.w3.org/2000/svg' height='1.5em' viewBox='0 0 128 128' fill='currentcolor'>
                    <path
                      d='M 120.85,29.21 C 120.85,29.62 120.72,29.99 120.47,30.33 C 120.21,30.66 119.94,30.83 119.63,30.83 C 117.14,31.07 115.09,31.87 113.51,33.24 C 111.92,34.6 110.29,37.21 108.6,41.05 L 82.8,99.19 C 82.63,99.73 82.16,100 81.38,100 C 80.77,100 80.3,99.73 79.96,99.19 L 65.49,68.93 L 48.85,99.19 C 48.51,99.73 48.04,100 47.43,100 C 46.69,100 46.2,99.73 45.96,99.19 L 20.61,41.05 C 19.03,37.44 17.36,34.92 15.6,33.49 C 13.85,32.06 11.4,31.17 8.27,30.83 C 8,30.83 7.74,30.69 7.51,30.4 C 7.27,30.12 7.15,29.79 7.15,29.42 C 7.15,28.47 7.42,28 7.96,28 C 10.22,28 12.58,28.1 15.05,28.3 C 17.34,28.51 19.5,28.61 21.52,28.61 C 23.58,28.61 26.01,28.51 28.81,28.3 C 31.74,28.1 34.34,28 36.6,28 C 37.14,28 37.41,28.47 37.41,29.42 C 37.41,30.36 37.24,30.83 36.91,30.83 C 34.65,31 32.87,31.58 31.57,32.55 C 30.27,33.53 29.62,34.81 29.62,36.4 C 29.62,37.21 29.89,38.22 30.43,39.43 L 51.38,86.74 L 63.27,64.28 L 52.19,41.05 C 50.2,36.91 48.56,34.23 47.28,33.03 C 46,31.84 44.06,31.1 41.46,30.83 C 41.22,30.83 41,30.69 40.78,30.4 C 40.56,30.12 40.45,29.79 40.45,29.42 C 40.45,28.47 40.68,28 41.16,28 C 43.42,28 45.49,28.1 47.38,28.3 C 49.2,28.51 51.14,28.61 53.2,28.61 C 55.22,28.61 57.36,28.51 59.62,28.3 C 61.95,28.1 64.24,28 66.5,28 C 67.04,28 67.31,28.47 67.31,29.42 C 67.31,30.36 67.15,30.83 66.81,30.83 C 62.29,31.14 60.03,32.42 60.03,34.68 C 60.03,35.69 60.55,37.26 61.6,39.38 L 68.93,54.26 L 76.22,40.65 C 77.23,38.73 77.74,37.11 77.74,35.79 C 77.74,32.69 75.48,31.04 70.96,30.83 C 70.55,30.83 70.35,30.36 70.35,29.42 C 70.35,29.08 70.45,28.76 70.65,28.46 C 70.86,28.15 71.06,28 71.26,28 C 72.88,28 74.87,28.1 77.23,28.3 C 79.49,28.51 81.35,28.61 82.8,28.61 C 83.84,28.61 85.38,28.52 87.4,28.35 C 89.96,28.12 92.11,28 93.83,28 C 94.23,28 94.43,28.4 94.43,29.21 C 94.43,30.29 94.06,30.83 93.32,30.83 C 90.69,31.1 88.57,31.83 86.97,33.01 C 85.37,34.19 83.37,36.87 80.98,41.05 L 71.26,59.02 L 84.42,85.83 L 103.85,40.65 C 104.52,39 104.86,37.48 104.86,36.1 C 104.86,32.79 102.6,31.04 98.08,30.83 C 97.67,30.83 97.47,30.36 97.47,29.42 C 97.47,28.47 97.77,28 98.38,28 C 100.03,28 101.99,28.1 104.25,28.3 C 106.34,28.51 108.1,28.61 109.51,28.61 C 111,28.61 112.72,28.51 114.67,28.3 C 116.7,28.1 118.52,28 120.14,28 C 120.61,28 120.85,28.4 120.85,29.21 z'/>
                  </svg>
                </Button>}

              </Card.Title>

              <div style={{marginBottom: '1em'}}>
                <div>
                  <span className='small text-muted font-weight-bold'>Artist: </span>
                  <Link
                    to={`/art/artist/${piece.artist.pk}`}
                    className='badge badge-pill badge-secondary'
                  >{piece.artist.name}</Link>

                </div>
                <div>
                  <span className='small text-muted font-weight-bold'>Location: </span>
                  <Link
                    to={`/art/location/${piece.location.pk}`}
                    className='badge badge-pill badge-secondary'
                  >{piece.location.name}</Link>
                </div>
                <div>
                  <span className='small text-muted font-weight-bold'>Art movements: </span>
                  {piece.styles.map((movement, i) =>
                      <span key={i}>
                    <Link
                      to={`/art/style/${movement.pk}`}
                      className='badge badge-pill badge-secondary'
                    >{movement.name}</Link>{' '}
                  </span>,
                  )}
                </div>
              </div>
              <Card.Text as='div' dangerouslySetInnerHTML={{__html: piece.description}}/>
            </Card.Body>
          </TextBox>
        </Card>
      </Col>

    </Row>
  )
}