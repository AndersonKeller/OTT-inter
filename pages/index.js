import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Carousel from '../components/carousel'

const CarouselSection = (props) => (
  <div className="cards-container">
    <div className="container-fluid">
      <h2 className="h2">{props.title}</h2>
    </div>
    <Carousel list={props.list} />
    <style jsx>{`
      .h2 {
        font-family: var(--sans-serif);
        font-size: 31px;
        font-weight: bold;
        line-height: 1;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 9%;
        text-transform: uppercase;
      }
    `}</style>
  </div>
)

const Home = () => {
  const platenences = [
    'static/cards/platenences/1.jpg',
    'static/cards/platenences/2.jpg',
    'static/cards/platenences/3.jpg',
    'static/cards/platenences/4.jpg',
    'static/cards/platenences/5.jpg',
    'static/cards/platenences/6.jpg',
    'static/cards/platenences/7.jpg',
    'static/cards/platenences/1.jpg',
    'static/cards/platenences/2.jpg',
    'static/cards/platenences/3.jpg',
    'static/cards/platenences/4.jpg',
  ]
  const arts = [
    'static/cards/arts/1.jpg',
    'static/cards/arts/2.jpg',
    'static/cards/arts/3.jpg',
    'static/cards/arts/4.jpg',
    'static/cards/arts/5.jpg',
    'static/cards/arts/6.jpg',
    'static/cards/arts/7.jpg',
    'static/cards/arts/1.jpg',
    'static/cards/arts/2.jpg',
    'static/cards/arts/3.jpg',
    'static/cards/arts/4.jpg',
  ]
  const podcasts = [
    'static/cards/podcasts/1.jpg',
    'static/cards/podcasts/2.jpg',
    'static/cards/podcasts/3.jpg',
    'static/cards/podcasts/4.jpg',
    'static/cards/podcasts/5.jpg',
    'static/cards/podcasts/6.jpg',
    'static/cards/podcasts/7.jpg',
  ]
  const interviews = [
    'static/cards/interviews/1.jpg',
    'static/cards/interviews/2.jpg',
    'static/cards/interviews/3.jpg',
    'static/cards/interviews/4.jpg',
    'static/cards/interviews/5.jpg',
    'static/cards/interviews/6.jpg',
    'static/cards/interviews/7.jpg',
  ]
  const news = [
    'static/cards/news/1.jpg',
    'static/cards/news/2.jpg',
    'static/cards/news/3.jpg',
    'static/cards/news/4.jpg',
    'static/cards/news/5.jpg',
    'static/cards/news/6.jpg',
    'static/cards/news/7.jpg',
  ]
  const family = [
    'static/cards/family/1.jpg',
    'static/cards/family/2.jpg',
    'static/cards/family/3.jpg',
    'static/cards/family/4.jpg',
    'static/cards/family/5.jpg',
    'static/cards/family/6.jpg',
    'static/cards/family/7.jpg',
  ]
  const children = [
    'static/cards/children/1.jpg',
    'static/cards/children/2.jpg',
    'static/cards/children/3.jpg',
    'static/cards/children/4.jpg',
    'static/cards/children/5.jpg',
    'static/cards/children/6.jpg',
    'static/cards/children/7.jpg',
  ]
  return (
    <Layout>
      <Head>
        <title>Dale Campeón</title>
      </Head>

      {/* cover */}
      <div className="cover">
        <div className="container-fluid">
          <div className="row">
            <div className="col col-5">
              <div className="description">
                <h1 className="h1">
                  <span className="h1-a">Entrevista a nuestro</span>
                  <strong className="h1-b">“Napoléon”</strong>
                  <span className="h1-c">Marcelo Gallardo</span></h1>
                <a className="btn btn-primary">Probar Gratis</a>
                <a className="btn btn-secondary">Ver más</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* platenences */}
      <CarouselSection title="Platenences" list={platenences} />

      {/* arts */}
      <CarouselSection title="Artes" list={arts} />

      {/* features */}
      <div className="featured">
        
      </div>

      {/* podcasts */}
      <CarouselSection title="Podcasts" list={podcasts} />

      {/* interviews */}
      <CarouselSection title="Entrevistas" list={interviews} />

      {/* features */}
      <div className="featured">
        
      </div>
      
      {/* news */}
      <CarouselSection title="Noticias" list={news} />

      {/* features */}
      <div className="featured">
        
      </div>
      
      {/* family */}
      <CarouselSection title="Familia" list={family} />
      
      {/* children */}
      <CarouselSection title="Niños" list={children} />

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
          padding-top: 104px;
          padding-left: 9%;
        }
        .h1 {
          display: flex;
          flex-direction: column;
          font-family: 'Bebas Neue Book';
          font-size: 62px;
          font-weight: normal;
          line-height: .9;
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
        .btn {
          border-radius: 5px;
          cursor: pointer;
          display: inline-block;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.35;
          padding: 10px 20px;
          user-select: none;
        }
        .btn-primary {
          background-color: var(--red);
          color: var(--white);
          margin-right: 15px;
        }
        .btn-secondary {
          border: 2px solid var(--gray);
          color: var(--gray);
          padding-top: 8px;
          padding-bottom: 8px;
        }
      `}</style>
    </Layout>
  )
}

export default Home
