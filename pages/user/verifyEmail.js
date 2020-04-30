// next imports
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

// react imports
import { useEffect, useState, useContext } from 'react'
import nookies from 'nookies'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import withApi from '~/components/withApi'
import Loading from '~/components/Loading/Loading'

const CheckEmail = ({ layoutProps, message }) => {

  useEffect(_ => {
      message = JSON.stringify(message)
      nookies.set({}, 'flash_message', message, { path: "/" })
      Router.push("/")
  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Verificación de email &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="h2">Verificación de email</h1>
            <Loading loadingState={true} />
          </div>
        </div>
      </div>
      <style jsx>{`
        header {
          padding-top: 15px;
        }
        .h2 {
          margin-bottom: 30px;
        }
        @media (min-width: 768px) {
          header {
            padding-top: 30px;
          }
        }
      `}</style>
    </Layout>
  );
}

CheckEmail.getInitialProps = async ctx => {
  try {
    const { api, query } = ctx
    const verifyURL = query.apiurl
    var message = {}
    var path = "/"

    const { status } = await api.get("",{baseURL: decodeURI(verifyURL)})
    message = (status == 200) ?
      {success: "Email verificado con éxito"}
    :
      {error: "Este correo electrónico no pudo ser verificado"}

  } catch (e) {
    message = {info: "Este enlace ha expirado"}
  }

  return { message }
}

export default withApi(CheckEmail)
