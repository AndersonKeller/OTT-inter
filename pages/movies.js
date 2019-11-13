import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import Layout from '../components/layout/Layout'
import { CONFIG } from '../config'
import { api } from '../services/api'

const MoviesPage = ({layoutProps}) => {

  const router = useRouter()
  const [medias,setMedias] = useState();
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
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
            <div>
              <ClipLoader
                sizeUnit={"px"}
                size={80}
                color={'#ff0000'}
                loading={loading}
              />
            </div>
            { ! loading && (
              <div className="media-cards row gutter-15">
                { medias.map((media, index) => (
                  <div className="col-2" key={index}>
                    <Link href="/media-inside-1">
                      <a className="media-card text-center">
                        <img className="img-fluid" src={media.thumbnail} />
                        <div className="media-card-label">{media.title}</div>
                      </a>
                    </Link>
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
        .media-card {
          display: block;
          font-size: 16px;
          line-height: 1;
          margin-bottom: 30px;
          text-decoration: none;
        }
        .media-card:focus,
        .media-card:hover {
          color: var(--white);
        }
        .media-card img {
          margin-bottom: 10px;
          transition: opacity .2s;
        }
        .media-card-label {
          opacity: .4;
          padding-right: 5%;
          padding-left: 5%;
          transition: opacity .2s;
        }
        .media-card:focus .media-card-label,
        .media-card:hover .media-card-label {
          opacity: .5;
        }
        .media-card:focus img,
        .media-card:hover img {
          opacity: .75;
        }
      `}</style>
    </Layout>
  );
}

export default MoviesPage
