// next imports
import Head from 'next/head'
import { useRouter } from 'next/router'

// react imports
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import api from '../services/api'
import Loading from '../components/Loading/Loading'
import MediaList from '../components/MediaList/MediaList'

// movies page
const MoviesPage = ({layoutProps}) => {

  const router = useRouter()
  const [medias, setMedias] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const search = router.query.search

  useEffect(_ => {
    const fetchData = async _ => {
      try {
        setLoading(true)
        const {data: medias} = await api().get(search ? `/search/${search}` : '/movies')
        setMedias(medias);
        setLoading(false)
      } catch (e) {
        setError(500)
      }
    }
    fetchData()
  }, [search])

  const title = search ? `Búsqueda para "${search}"` : 'Búsqueda'

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>{title} &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">

            <header>
              <h1 className="h2">Videos</h1>
              {error ? (
                <h1 className="h6">{error} | Incapaz de buscar</h1>
              ) : search && !loading && (
                <h1 className="h4">{medias.length} resultados para "{search}"</h1>
              )}
            </header>
            <Loading loadingState={loading} />
            { ! loading && (
              <MediaList {...{medias}} />
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

export default MoviesPage

