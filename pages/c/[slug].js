import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState} from 'react'
import shuffle from 'shuffle-array'

import Layout from '../../components/layout/Layout'
import { CONFIG } from '../../config'
import { STATIC_PATH } from '../../constants/constants'
import { api } from '../../services/api'
import MediaCard from '../../components/MediaCard/MediaCard'

const Category = ({ category, errorCode, layoutProps, medias, ...props }) => {

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  // const router = useRouter()

  return (
    <Layout {...layoutProps}>
      <Head>
        <title>{category.name} &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <header>
              <h1 className="h2">{category.name}</h1>
            </header>
            { medias.length ? (
              <div className="media-cards row gutter-15">
                { medias.map((media, key) => (
                  <div className="col-2" {...{key}}>
                    <MediaCard {...{category, media}} />
                  </div>
                )) }
              </div>
            ) : (
              <div>
                <p>No se encontraron registros.</p>
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

Category.getInitialProps = async (context) => {
  const { slug } = context.query;
  let category, medias = [], errorCode = false
  try {
    const response = await api.get(`/category/${slug}`)
    category = response.data
    medias = category.movies
  } catch (error) {
    errorCode = 404
  }
  return { category, errorCode, medias }
}

export default Category
