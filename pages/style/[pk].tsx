import type { NextPage, GetStaticProps } from 'next'
import type { LayoutProps, ArtStyle } from '../../types/instaArtTypes'
import { Layout } from '../../components/Layout'

export const getStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/art/style`
  )
  const data = await response.json()
  const paths = data.map((style: ArtStyle) => ({
    params: { pk: style.pk.toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { pk } = context.params!

  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/art/artist/${pk}`
  )
  const apiData = await apiResponse.json()

  return { props: { apiData } }
}

const IndexPage: NextPage<LayoutProps> = ({ apiData }) => {
  return <Layout apiData={apiData} />
}

export default IndexPage
