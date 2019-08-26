import React from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Button from '../components/button'
import Featured from '../components/featured'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'

const Home = _ => {
  return (
    <Layout>
      <Head>
        <title>Dale Campeón</title>
      </Head>
      <div className="index">

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
                  <Button>Probar Gratis</Button>
                  <Button color="secondary">Ver más</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* platenences */}
        <CarouselSection title="Platenences">
          <Card src="/static/cards/platenences/1.jpg" />
          <Card src="/static/cards/platenences/2.jpg" />
          <Card src="/static/cards/platenences/3.jpg" />
          <Card src="/static/cards/platenences/4.jpg" />
          <Card src="/static/cards/platenences/5.jpg" />
          <Card src="/static/cards/platenences/6.jpg" />
          <Card src="/static/cards/platenences/7.jpg" />
        </CarouselSection>

        {/* arts */}
        <CarouselSection title="Artes">
          <Card src="/static/cards/arts/1.jpg" />
          <Card src="/static/cards/arts/2.jpg" />
          <Card src="/static/cards/arts/3.jpg" />
          <Card src="/static/cards/arts/4.jpg" />
          <Card src="/static/cards/arts/5.jpg" />
          <Card src="/static/cards/arts/6.jpg" />
          <Card src="/static/cards/arts/7.jpg" />
        </CarouselSection>

        {/* features */}
        <Featured img="/static/featured/crear.jpg">
          <Button>Probar Gratis</Button>
          <Button color="secondary">Compra aquí</Button>
        </Featured>

        {/* podcasts */}
        <CarouselSection title="Podcasts">
          <Card src="/static/cards/podcasts/1.jpg" />
          <Card src="/static/cards/podcasts/2.jpg" />
          <Card src="/static/cards/podcasts/3.jpg" />
          <Card src="/static/cards/podcasts/4.jpg" />
          <Card src="/static/cards/podcasts/5.jpg" />
          <Card src="/static/cards/podcasts/6.jpg" />
          <Card src="/static/cards/podcasts/7.jpg" />
        </CarouselSection>

        {/* interviews */}
        <CarouselSection title="Entrevistas">
          <Card src="/static/cards/interviews/1.jpg" />
          <Card src="/static/cards/interviews/2.jpg" />
          <Card src="/static/cards/interviews/3.jpg" />
          <Card src="/static/cards/interviews/4.jpg" />
          <Card src="/static/cards/interviews/5.jpg" />
          <Card src="/static/cards/interviews/6.jpg" />
          <Card src="/static/cards/interviews/7.jpg" />
        </CarouselSection>

        {/* features */}
        <Featured img="/static/featured/axe.jpg">
          <Button>Probar Gratis</Button>
          <Button color="secondary">Descubri más</Button>
        </Featured>
        
        {/* news */}
        <CarouselSection title="Noticias">
          <Card src="/static/cards/news/1.jpg" />
          <Card src="/static/cards/news/2.jpg" />
          <Card src="/static/cards/news/3.jpg" />
          <Card src="/static/cards/news/4.jpg" />
          <Card src="/static/cards/news/5.jpg" />
          <Card src="/static/cards/news/6.jpg" />
          <Card src="/static/cards/news/7.jpg" />
        </CarouselSection>

        {/* features */}
        <Featured img="/static/featured/sorteos.png">
          <Button>Probar Gratis</Button>
          <Button color="secondary">Ver más</Button>
        </Featured>
        
        {/* family */}
        <CarouselSection title="Familia">
          <Card src="/static/cards/family/1.png" />
          <Card src="/static/cards/family/2.png" />
          <Card src="/static/cards/family/3.png" />
          <Card src="/static/cards/family/4.png" />
          <Card src="/static/cards/family/5.png" />
          <Card src="/static/cards/family/6.png" />
          <Card src="/static/cards/family/7.png" />
        </CarouselSection>
        
        {/* children */}
        <CarouselSection title="Niños">
          <Card src="/static/cards/children/1.png" />
          <Card src="/static/cards/children/2.png" />
          <Card src="/static/cards/children/3.png" />
          <Card src="/static/cards/children/4.png" />
          <Card src="/static/cards/children/5.png" />
          <Card src="/static/cards/children/6.png" />
          <Card src="/static/cards/children/7.png" />
        </CarouselSection>  

      </div>
      <style jsx>{`
        .index {
          padding-bottom: 55px;
        }
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
      `}</style>
    </Layout>
  )
}
export default Home
