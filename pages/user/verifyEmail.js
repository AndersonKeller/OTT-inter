// next imports
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

// react imports
import { useEffect, useState, useContext } from 'react'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import api from '../../services/api'
import Loading from '../../components/Loading/Loading'
import { AuthModalContext } from '../../contexts/AuthModalContext'

const CheckEmail = ({layoutProps, userMenuProps}) => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { closeAuthModal, openAuthModal, setTab } = useContext(AuthModalContext)
  const router = useRouter();
  const verify = router.query.apiurl;

  const fetchData = async _ => {
    console.table(userMenuProps);
    try {
      const { status } = await api.get('',{baseURL: decodeURI(verify)})

      if(status == 200 ){
        setLoading(false)
        setTimeout(() => {
          openAuthModal('login')
        }, 2000);
      }else{
        setLoading(false)
        setError('Email could not be verified')
        setTimeout(() => {
          Router.push('/')
        }, 2000);
      }
    } catch (e) {
      setLoading(false)
      setError('Link Expired')
      setTimeout(() => {
        Router.push('/')
      }, 2000);
    }
  }

  useEffect(() => {
    fetchData();
    // return () => {
    //   cleanup
    // };
  }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Email Verification &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1 className="h2">Verificacion de email</h1>
            <Loading loadingState={loading} />
            {<h1 className="h6">Problem: </h1> && error}
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

export default CheckEmail
