import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import Policy from '../components/policy' 
import { api } from '../services/api'

const PrivacyPolicy = ({ layoutProps, ...props }) => (
    <div>
        <Layout {...layoutProps}>
            <Head>
                <title>{props.title} &lt; {CONFIG.appName}</title>
            </Head>
            <Policy title={props.title} policy={props.privacy} />
        </Layout>
    </div>
);

PrivacyPolicy.getInitialProps = async function() {
    const res = await api.get(`/privacypolicy`);
    const data = await res.data;

    const title = "Política de Privacidad";

    console.log(data.privacy_policy.privacy_pol);
    return { title: title, privacy: data.privacy_policy.privacy_pol}  ; 
}

export default PrivacyPolicy