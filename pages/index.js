import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Carousel from '../components/carousel'

const Home = () => (
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
    <div className="cards-container">
      <div className="container-fluid">
        <h2 className="h2">Platenences</h2>
      </div>
      <Carousel />
    </div>

    {/* arts */}
    <div className="cards-container">
      <div className="container-fluid">
        <h2 className="h2">Artes</h2>
      </div>
      <Carousel />
    </div>

    <div className='row2'>
      <Link href=''>
        <a className='card'>
          <h3>Getting Started &rarr;</h3>
          <p>Learn more about Dale on GitHub and in their examples</p>
        </a>
      </Link>
      <Link href=''>
        <a className='card'>
          <h3>Examples &rarr;</h3>
          <p>Find other example boilerplates on the Dale GitHub</p>
        </a>
      </Link>
      <Link href=''>
        <a className='card'>
          <h3>Create App &rarr;</h3>
          <p>Was this tool helpful? Let us know how we can improve it!</p>
        </a>
      </Link>
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
      .title {
        margin: 0;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title {
        text-align: center;
      }
      .row2 {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </Layout>
)

export default Home
