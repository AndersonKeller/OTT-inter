import Head from 'next/head'
import Link from 'next/link'

import React, { useContext } from 'react'

import Button from '../components/button'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'
import Featured from '../components/featured'
import Layout from '../components/layout/Layout'
import MiLista from '../components/mi-lista'
import UserContext from '../components/UserContext'
import { STATIC_PATH, TENANT } from '../constants/constants'
import { CONFIG } from '../config'
import { api } from '../services/api'

const HomeCarouselSection = ({data}) => (
  <>
    {data && data.name && (
      <CarouselSection title={data.name}>
        {data.movies.length &&
          data.movies.map(item => (
            <>
              <Card href="/media-inside-1" src={item.thumbnail_url} />
              {/* <Card
                as="/c/entrevistas"
                href="/c/[slug]"
                src={`${STATIC_PATH}/cards/interviews/1.png`}
              /> */}
            </>
          ))
        }
      </CarouselSection>
    )}

  </>
)

const Home = ({ layoutProps, platences, arts, podcasts, interviews, news, family, children }) => {
  const { user } = useContext(UserContext)
  return (
    <Layout {...layoutProps} paddingTop={false}>
      <Head>
        <title>{CONFIG.appName}</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover />

        {/* platenences */}
        <HomeCarouselSection data={platences} />

        {/* arts */}
        <HomeCarouselSection data={arts} />

        {/* featured */}
        {!user ? (
          <Featured img={`${STATIC_PATH}/featured/crear.png`}>
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Button color="secondary" outline>Compra aquí</Button>
          </Featured>
        ) : (
          <Featured img={`${STATIC_PATH}/logged-banner1.png`}>
            <Link href="/media-inside-2-public">
              <Button>Ver más</Button>
            </Link>
            <MiLista />
          </Featured>
        )}

        {/* podcasts */}
        <HomeCarouselSection data={podcasts} />

        {/* interviews */}
        <HomeCarouselSection data={interviews} />

        {/* features */}
        {!user ? (
          <Featured img={`${STATIC_PATH}/featured/sponsored-or-generic.png`}>
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Button color="secondary" outline>Descubri más</Button>
          </Featured>
        ) : (
          <Featured img={`${STATIC_PATH}/logged-banner2.png`}>
            <Link href="/media-inside-2-public">
              <Button>Ver más</Button>
            </Link>
            <MiLista color="white" />
          </Featured>
        )}

        {/* news */}
        <HomeCarouselSection data={news} />

        {/* features */}
        {!user ? (
          <Featured img={`${STATIC_PATH}/featured/sorteos.png`}>
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Link as="/c/sorteos" href="/c/[slug]">
              <Button color="secondary" outline>Ver más</Button>
            </Link>
          </Featured>
        ) : (
          <Featured img={`${STATIC_PATH}/logged-banner3.png`}>
            <Link href="/media-inside-2-public">
              <Button>Ver más</Button>
            </Link>
            <MiLista />
          </Featured>
        )}

        {/* family */}
        <HomeCarouselSection data={family} />

        {user && (
          <Featured img={`${STATIC_PATH}/logged-banner4.png`}>
            <Link href="/media-inside-2-public">
              <Button>Ver más</Button>
            </Link>
            <MiLista color="white" />
          </Featured>
        )}

        {/* children */}
        <HomeCarouselSection data={children} />

      </div>
      <style jsx>{`
        .index {
          padding-bottom: 55px;
        }
      `}</style>
    </Layout>
  )
}

Home.getInitialProps = async () => {
  const errorCode = 1 ? false : 404
  let platences = [],
    arts = [],
    podcasts = [],
    interviews = [],
    news = [],
    family = [],
    children = []
  try {
    const platencesResponse = await api.get(`/category/platences`)
    platences = platencesResponse.data
    const artsResponse = await api.get(`/category/artes`)
    arts = artsResponse.data
    const podcastsResponse = await api.get(`/category/podcasts`)
    podcasts = podcastsResponse.data
    const interviewsResponse = await api.get(`/category/entrevistas`)
    interviews = interviewsResponse.data
    const newsResponse = await api.get(`/category/noticias`)
    news = newsResponse.data
    const familyResponse = await api.get(`/category/familia`)
    family = familyResponse.data
    const childrenResponse = await api.get(`/category/ninos`)
    children = childrenResponse.data
  } catch (error) {
    console.error('We have an error')
  }
  return { errorCode, platences, arts, podcasts, news, family, children }
}

export default Home

const Cover = _ => {
  const { user } = useContext(UserContext)
  return (
    <div className="cover">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-5">
            <div className="description">
              <h1 className="h1">
                <span className="h1-a">Entrevista a nuestro</span>
                <strong className="h1-b">{
                  process.env.TENANT === 'dalecampeon' ?
                  `“Napoléon”` :
                  `Comandante`
                }</strong>
                <span className="h1-c">{
                  process.env.TENANT === 'dalecampeon' ?
                  'Marcelo Gallardo' :
                  'Mario Salas'
                }</span></h1>
              { ! user ? (
                <>
                  <Link href="/subscriptor">
                    <Button>Probar Gratis</Button>
                  </Link>
                  <Link as="/c/entrevistas" href="/c/[slug]">
                    <Button color="secondary" outline>Ver más</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link as="/c/entrevistas" href="/c/[slug]">
                    <Button>Ver más</Button>
                  </Link>
                  <MiLista />
                </>
              )}
              </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cover {
          align-items: center;
          background-image: url(${STATIC_PATH}/cover.png);
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          height: 640px;
          margin-bottom: 20px;
          min-height: 90vh;
          overflow: hidden;
          padding-top: var(--padding-top);
          padding-left: 9%;
        }
        .cover :global(.btn) {
          margin-right: 15px;
        }
        .h1 {
          display: flex;
          flex-direction: column;
          font-family: 'Bebas Neue Book';
          font-size: 62px;
          font-weight: normal;
          line-height: .98;
          margin-top: 0;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .h1-a {
          position: relative;
          z-index: 2;
        }
        .h1-b {
          color: var(--primary);
          font-family: 'Bebas Neue';
          font-size: 139px;
          font-weight: bold;
          margin-left: -50px;
          position: relative;
          z-index: 1;
        }
        .h1-c {
          font-size: 72px;
          margin-top: -15px;
        }
      `}</style>
    </div>
  )
}
