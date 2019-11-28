import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import Policy from '../components/policy'
import api from '../services/api'

const PrivacyPolicy = ({ layoutProps, privacy }) => {
  const title = "Política de Privacidad";
  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>{title} &lt; {CONFIG.appName}</title>
      </Head>
      <Policy title={title} policy={privacy} />
    </Layout>
  )
}

PrivacyPolicy.getInitialProps = async function() {
  const res = await api.get(`/privacypolicy`);
  const data = await res.data;
  return { title: title, privacy: data.privacy_policy.privacy_pol}  ;
}

export default PrivacyPolicy
