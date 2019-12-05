// next imports
import Head from 'next/head'

// react imports
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import api from '../services/api'
import Loading from '../components/Loading/Loading'
import MediaList from '../components/MediaList/MediaList'

// wishlist page
const WishlistPage = ({layoutProps}) => {

  const [medias, setMedias] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = async _ => {
    try {
      setLoading(true)
      const {data: medias} = await api.get('/wishlist')
      setMedias(medias);
      setLoading(false)
    } catch (e) {
      setError(500)
    }
  }

  useEffect( _ => { fetchData() }, [])

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Mi lista &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">

            <header>
              <h1 className="h2">Mi lista</h1>
              {error ? (
                <h1 className="h6">{error}</h1>
              ) : !loading && (
                <h1 className="h4">{medias.length} Videos</h1>
              )}
            </header>
            <Loading loadingState={loading} />
            { ! loading && (
              <MediaList {...{medias, wishlist: true}} />
            )}

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

export default WishlistPage

