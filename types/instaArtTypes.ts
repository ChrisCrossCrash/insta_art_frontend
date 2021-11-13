export type Artist = {
  name: string
  pk: number
}

export type ArtLocation = {
  name: string
  pk: number
}

export type ArtStyle = {
  name: string
  pk: number
}

export type ArtPiece = {
  title: string
  artist: Artist
  location?: ArtLocation
  styles?: ArtStyle[]
  description: string
  wiki_url?: string
  image: {
    url: string
    height: number
    width: number
  }
}

export type LayoutProps = {
  apiData: {
    count: number
    next: string | null
    previous: string | null
    results: ArtPiece[]
  }
}
