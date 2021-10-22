import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'components/Elements/Link'
import Layout from 'components/Layout/Layout'
import SubscribeBox from 'components/Layout/SubscribeBox'

export default function index({ posts }) {
  return (
    <Layout>
      Welcome!
      <Head>
        <title>Godot Academy</title>
      </Head>
      <SubscribeBox />
    </Layout>
  )
}

export async function getStaticProps() {
  return { props: { } }
}
