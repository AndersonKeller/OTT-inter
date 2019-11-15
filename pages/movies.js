// next imports
import Head from 'next/head'
import { useRouter } from 'next/router'

// react imports
import { useEffect, useState } from 'react'

// app imports
import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import { api } from '../services/api'
import Loading from '../components/Loading/Loading'
import MediaCard from '../components/MediaCard/MediaCard'

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
        const {data: medias} = await api.get(search ? `/search/${search}` : '/movies')
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
          <div className="col-10 offset-1">

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
              <div className="media-cards row gutter-15">
                { medias.map((media, key) => (
                  <div className="col-2" {...{key}}>
                    <MediaCard {...{media}} />
                  </div>
                )) }
              </div>
            )}

          </div>
        </div>
      </div>

      <style jsx>{`
        header {
          padding-top: 60px;
        }
        .h2 {
          margin-bottom: 30px;
        }
        .media-cards {
          margin-bottom: 100px;
        }
      `}</style>
    </Layout>
  );
}

export default MoviesPage

