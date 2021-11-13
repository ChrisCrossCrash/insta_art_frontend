import type { NextPage, GetStaticProps } from 'next'
import type { LayoutProps } from '../types/instaArtTypes'
import { Layout } from '../components/Layout'

export const getStaticProps: GetStaticProps = async (context) => {
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/art`
  )
  const apiData = await apiResponse.json()

  return { props: { apiData } }
}

const IndexPage: NextPage<LayoutProps> = ({ apiData }) => (
  <Layout apiData={apiData} />
)

export default IndexPage
