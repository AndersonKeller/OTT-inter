// next imports
import Head from 'next/head'
import Router, { useRouter } from 'next/router'

// react imports
import { useEffect, useState } from 'react'

// app imports
import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import { api } from '../../services/api'
import Loading from '../../components/Loading/Loading'

const CheckEmail = ({layoutProps, userMenuProps}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const verify = router.query.apiurl;

  const fetchData = async _ => {
    console.table(userMenuProps);
    try {
      let data = await api.get('',{baseURL: decodeURI(verify)});
      // console.log(teste);
      const { status } = data

      if(status == 200 ){
        setLoading(false)
        // return redirect();
        Router.push('/')
      }else{
        // Router.push('/')
        setLoading(false)
        setError('Email not verified')
      }
    } catch (e) {
      setLoading(false)
      setError('Link Expired')
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

            {/* <header> */}
              <h1 className="h2">Email Verification</h1>
            {/* </header> */}
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
