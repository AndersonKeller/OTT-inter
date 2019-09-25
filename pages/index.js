import Head from 'next/head'
import Link from 'next/link'

import React, { useContext } from 'react'

import Button from '../components/button'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'
import Featured from '../components/featured'
import Layout from '../components/layout'
import MiLista from '../components/mi-lista'
import UserContext from '../components/UserContext'

const Home = _ => {

  const { user } = useContext(UserContext)

  return (
    <Layout paddingTop={false}>
      <Head>
        <title>Dale Campeón</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover />

        {/* platenences */}
        <CarouselSection title="Platences">
          <Card href="/videos" src="/static/cards/platenences/1.png" />
          <Card href="/videos" src="/static/cards/platenences/2.jpg" />
          <Card href="/videos" src="/static/cards/platenences/3.jpg" />
          <Card href="/videos" src="/static/cards/platenences/4.jpg" />
          <Card href="/videos" src="/static/cards/platenences/5.jpg" />
          <Card href="/videos" src="/static/cards/platenences/6.jpg" />
          <Card href="/videos" src="/static/cards/platenences/7.jpg" />
        </CarouselSection>

        {/* arts */}
        <CarouselSection title="Artes">
          <Card href="/videos" src="/static/cards/arts/1.jpg" />
          <Card href="/videos" src="/static/cards/arts/2.jpg" />
          <Card href="/videos" src="/static/cards/arts/3.jpg" />
          <Card href="/videos" src="/static/cards/arts/4.jpg" />
          <Card href="/videos" src="/static/cards/arts/5.jpg" />
          <Card href="/videos" src="/static/cards/arts/6.jpg" />
          <Card href="/videos" src="/static/cards/arts/7.jpg" />
        </CarouselSection>

        {/* featured */}
        {!user ? (
          <Featured img="/static/featured/crear.jpg">
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
          <Card href="/podcasts" src="/static/cards/podcasts/1.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/2.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/3.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/4.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/5.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/6.jpg" />
          <Card href="/podcasts" src="/static/cards/podcasts/7.jpg" />
        </CarouselSection>

        {/* interviews */}
        <CarouselSection title="Entrevistas">
          <Card href="/entrevistas" src="/static/cards/interviews/1.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/2.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/3.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/4.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/5.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/6.jpg" />
          <Card href="/entrevistas" src="/static/cards/interviews/7.jpg" />
        </CarouselSection>

        {/* features */}
        {!user ? (
          <Featured img="/static/featured/axe.jpg">
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
          <Card href="/videos" src="/static/cards/news/1.jpg" />
          <Card href="/videos" src="/static/cards/news/2.jpg" />
          <Card href="/videos" src="/static/cards/news/3.jpg" />
          <Card href="/videos" src="/static/cards/news/4.jpg" />
          <Card href="/videos" src="/static/cards/news/5.jpg" />
          <Card href="/videos" src="/static/cards/news/6.jpg" />
          <Card href="/videos" src="/static/cards/news/7.jpg" />
        </CarouselSection>

        {/* features */}
        {!user ? (
          <Featured img="/static/featured/sorteos.png">
            <Link href="/subscriptor">
              <Button>Probar Gratis</Button>
            </Link>
            <Link href="/sorteos">
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
                <strong className="h1-b">“Napoléon”</strong>
                <span className="h1-c">Marcelo Gallardo</span></h1>
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
          background-image: url(/static/napoleon.png);
          background-position: 50% 50%;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          height: 640px;
          margin-bottom: 20px;
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
