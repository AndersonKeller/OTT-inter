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
                { medias.map((media, index) => (
                  <div className="col-2" key={index}>
                    <Link href="/media-inside-1">
                      <a className="media-card text-center">
                        <img className="img-fluid" src={media.thumbnail_url} />
                        <div className="media-card-label">{media.title}</div>
                      </a>
                    </Link>
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
