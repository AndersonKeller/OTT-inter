// next imports
import Head from 'next/head'

// react imports
import { useEffect, useState, useContext } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import api from '../services/api'
import Loading from '../components/Loading/Loading'
import MediaList from '../components/MediaList/MediaList'
import Button from '../components/button'
import UserContext from '../contexts/UserContext'
import Router from 'next/router'

// wishlist page
const WishlistPage = ({layoutProps}) => {

  const [medias, setMedias] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const {user} = useContext(UserContext)

  /* temporarily handle user presence */
  useEffect(_ => {
    const timeout = setTimeout(_ => {
      if ( ! user) {
        Router.push('/login')
      }
    }, 1000)
    return function cleanup() {
      clearTimeout(timeout)
    }
  }, [user])

  const fetchData = async _ => {
    setLoading(true)
    try {
      const {data: medias} = await api.get('/wishlist')
      setMedias(medias);
    } catch (e) {
      setError(500)
    }
    setLoading(false)
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

            {/* heading */}
            <header>
              <h1 className="h2">Mi lista</h1>
            </header>

            {/* loading */}
            <Loading loadingState={loading} />

            {/* empty msg */}
            { ! loading && medias && medias.length === 0 && (
              <div>
                <div className="info">
                  <p>Aún no hay videos en tu lista.</p>
                </div>
                <Button href="/movies">Agregar videos</Button>
              </div>
            ) }

            {/* error msg */}
            { ! loading && error && ! medias && (
              <p>{error}</p>
            ) }

            {/* media list */}
            { ! loading && ! error && medias && medias.length >= 1 && (
              <MediaList {...{medias, wishlist: true}} />
            ) }

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
        .info {
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

