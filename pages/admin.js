
import Head from 'next/head'
import redirect from 'next-redirect'

import Layout from '../components/layout/Layout'

const Admin = ({ layoutProps }) => (
  <Layout {...layoutProps}>
    <Head>
      <title>Redirecting...</title>
    </Head>
  </Layout>
);

Admin.getInitialProps = async function(ctx) {
	return redirect(ctx, 'http://nexthour-env.dyc2edrtwa.sa-east-1.elasticbeanstalk.com/')
}

export default Admin;
