import type { NextPage, GetServerSideProps } from 'next'
import type { LayoutProps } from '../../types/instaArtTypes'
import { Layout } from '../../components/Layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pk } = context.params!
  const { page } = context.query

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN
  const apiUrl = `${apiDomain}/api/art/style/${pk}?page=${page ? page : '1'}`

  const apiResponse = await fetch(apiUrl)
  const apiData = await apiResponse.json()

  return { props: { apiData } }
}

const StylePage: NextPage<LayoutProps> = ({ apiData }) => {
  return <Layout apiData={apiData} />
}

export default StylePage
