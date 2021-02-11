
import Head from 'next/head'
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import Policy from '../components/policy'
import api from '../services/api'
import React from "react";

const TermsAndPolitics = ({ layoutProps, privacy }) => {
  const title = "Términos y condiciones";
  return (
    <Layout color="white" {...layoutProps} footer={"show"}>
      <Head>
        <title>{title} &lt; {CONFIG.appName}</title>
      </Head>
      <Policy title={title} policy={privacy} />
    </Layout>
  );
}

TermsAndPolitics.getInitialProps = async ctx => {
  const res = await api(ctx).get(`/privacypolicy`);
  const data = await res.data;
  return { privacy: data.privacy_policy.terms_condition };
}

export default TermsAndPolitics
