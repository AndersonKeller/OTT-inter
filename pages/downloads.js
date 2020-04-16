// other imports
import Head from 'next/head'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'

export default function CategoriesPage({ layoutProps }) {
  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Categories &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <p>Under construction.</p>
      </div>
      <style jsx>{`
      `}</style>
    </Layout>
  );
}
