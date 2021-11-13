import type { NextPage, GetServerSideProps } from 'next'
import type { LayoutProps } from '../types/instaArtTypes'
import { Layout } from '../components/Layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page } = context.query
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/art?page=${page ? page : '1'}`
  )
  const apiData = await apiResponse.json()

  return { props: { apiData } }
}

const IndexPage: NextPage<LayoutProps> = ({ apiData }) => (
  <Layout apiData={apiData} />
)

export default IndexPage
