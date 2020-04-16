import Head from 'next/head'
import Layout from '~/components/layout/Layout'
import Policy from '~/components/policy'
import withApi from '~/components/withApi'
import { CONFIG } from '~/config'

const PrivacyPolicyPage = ({ layoutProps, privacy }) => {
  const title = "Política de Privacidad"
  return (
    <Layout color="white" {...layoutProps}>
      <Head>
        <title>{title} &lt; {CONFIG.appName}</title>
      </Head>
      <Policy title={title} policy={privacy} />
    </Layout>
  )
}

PrivacyPolicyPage.getInitialProps = async ({api}) => {
  const { data } = await api.get(`/privacypolicy`)
  return { privacy: data.privacy_policy.privacy_pol }
}

export default withApi(PrivacyPolicyPage)
