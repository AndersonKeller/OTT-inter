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
import SearchContext from '../contexts/SearchContext'
// movies page
const MoviesPage = ({ layoutProps }) => {

  const [medias, setMedias] = useState();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { search, setSearch } = useContext(SearchContext)

  const handleSearch = e => {
    // Implementar Dwebounce to SearchField
    // Instalar pacote Lodash _
  }

  useEffect(_ => {
    const fetchData = async _ => {
      try {
        setLoading(true)
        const { data: medias } = await api().get(search ? `/search/${search}` : '/movies')
        setMedias(medias)
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
              <h1 className="h2">Videos
                <input
                  className="form-control" type="search" placeholder="Buscar"
                  onChange={e => setSearch(e.target.value)} value={search}
                />
              </h1>
              {error ? (
                <h1 className="h6">{error} | Incapaz de buscar</h1>
              ) : search && !loading && (
                <h1 className="h4">{medias.length} resultados para "{search}"</h1>
              )}
            </header>
            <Loading loadingState={loading} />
            {!loading && (
              <MediaList {...{ medias }} />

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
        input[type=search] {
          padding: 0px 10px;
          margin-left: 30px;
          width: 40vw;
          font-size: 12px;
          transition: ease-in-out 0.7s;
          box-shadow: 0 0 0 0.1rem var(--primary);
        }
        .form-control {
          background-color: transparent;
          border: 0;
          display: inline-block;
          color: #fff;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          outline: 0;
          padding: 0;
          vertical-align: middle;
          width: 95px;
        }
        .form-control::placeholder {
          color: var(--light-gray);
        }
      `}</style>
    </Layout>
  );
}

export default MoviesPage

