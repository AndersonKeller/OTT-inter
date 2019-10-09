import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'

export default function Fotos() {
  return (
    <Layout>
      <Head>
        <title>Fotos &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <p>Under construction</p>
      </div>
    </Layout>
  );
}
