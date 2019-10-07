import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { APP_NAME } from '../constants/constants'

export default function Fotos() {
  return (
    <Layout>
      <Head>
        <title>Fotos &lt; {APP_NAME}</title>
      </Head>
      <div className="container-fluid">
        <p>Under construction</p>
      </div>
    </Layout>
  );
}
