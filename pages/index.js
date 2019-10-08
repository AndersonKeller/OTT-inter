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
import { APP_NAME, STATIC_PATH, TENANT } from '../constants/constants'

const Home = _ => {

  const { user } = useContext(UserContext)
  const supportersSlug = TENANT === 'dalecampeon' ? 'platences' : 'albos'

  return (
    <Layout paddingTop={false}>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover />

        {/* platenences */}
        <CarouselSection title={TENANT === 'dalecampeon' ? 'Platences' : 'Albos'}>
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/1.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/2.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/3.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/4.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/5.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/6.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/${supportersSlug}/7.png`} />
        </CarouselSection>

        {/* arts */}
        <CarouselSection title="Artes">
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/1.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/2.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/3.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/4.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/5.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/6.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/arts/7.png`} />
        </CarouselSection>

        {/* featured */}
        {!user ? (
          <Featured img={`${STATIC_PATH}/featured/crear.png`}>
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Button color="secondary" outline>Compra aquí</Button>
          </Featured>
        ) : (
          <Featured img="/static/logged-banner1.png">
            <Link href="/videos">
              <Button>Ver más</Button>
            </Link>
            <MiLista />
          </Featured>
        )}

        {/* podcasts */}
        <CarouselSection title="Podcasts">
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/1.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/2.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/3.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/4.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/5.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/6.png`} />
          <Card href="/podcasts" src={`${STATIC_PATH}/cards/podcasts/7.png`} />
        </CarouselSection>

        {/* interviews */}
        <CarouselSection title="Entrevistas">
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/1.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/2.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/3.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/4.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/5.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/6.png`} />
          <Card href="/entrevistas" src={`${STATIC_PATH}/cards/interviews/7.png`} />
        </CarouselSection>

        {/* features */}
        {!user ? (
          <Featured img={`${STATIC_PATH}/featured/sponsored-or-generic.png`}>
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Button color="secondary" outline>Descubri más</Button>
          </Featured>
        ) : (
          <Featured img="/static/logged-banner2.png">
            <Link href="/videos">
              <Button>Ver más</Button>
            </Link>
            <MiLista color="white" />
          </Featured>
        )}

        {/* news */}
        <CarouselSection title="Noticias">
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/1.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/2.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/3.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/4.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/5.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/6.png`} />
          <Card href="/videos" src={`${STATIC_PATH}/cards/news/7.png`} />
        </CarouselSection>

        {/* features */}
        {!user ? (
          <Featured img="/static/featured/sorteos.png">
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Link as="/c/sorteos" href="/c/[slug]">
              <Button color="secondary" outline>Ver más</Button>
            </Link>
          </Featured>
        ) : (
          <Featured img="/static/logged-banner3.png">
            <Link href="/videos">
              <Button>Ver más</Button>
            </Link>
            <MiLista />
          </Featured>
        )}

        {/* family */}
        <CarouselSection title="Familia">
          <Card href="/videos" src="/static/cards/family/1.png" />
          <Card href="/videos" src="/static/cards/family/2.png" />
          <Card href="/videos" src="/static/cards/family/3.png" />
          <Card href="/videos" src="/static/cards/family/4.png" />
          <Card href="/videos" src="/static/cards/family/5.png" />
          <Card href="/videos" src="/static/cards/family/6.png" />
          <Card href="/videos" src="/static/cards/family/7.png" />
        </CarouselSection>

        {user && (
          <Featured img="/static/logged-banner4.png">
            <Link href="/videos">
              <Button>Ver más</Button>
            </Link>
            <MiLista color="white" />
          </Featured>
        )}

        {/* children */}
        <CarouselSection title="Niños">
          <Card href="/videos" src="/static/cards/children/1.png" />
          <Card href="/videos" src="/static/cards/children/2.png" />
          <Card href="/videos" src="/static/cards/children/3.png" />
          <Card href="/videos" src="/static/cards/children/4.png" />
          <Card href="/videos" src="/static/cards/children/5.png" />
          <Card href="/videos" src="/static/cards/children/6.png" />
          <Card href="/videos" src="/static/cards/children/7.png" />
        </CarouselSection>

      </div>
      <style jsx>{`
        .index {
          padding-bottom: 55px;
        }
      `}</style>
    </Layout>
  )
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
                  <Link href="/entrevistas">
                    <Button color="secondary" outline>Ver más</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/entrevistas">
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
          color: var(--red);
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
