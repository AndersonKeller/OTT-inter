import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import Header from '../components/header'

const cards = [0, 1, 2, 3, 4, 5, 6, 7]

const Home = () => (
  <Layout>
    <Head>
      <title>Dale Campeón</title>
    </Head>

    <div className='hero-cover'>
      <div className='hero-description'>
        <h1 className='h1'>Entrevista a nuestro "Napoléon" Marcelo Gallardo</h1>
        <a className='btn btn-primary'>Probar Gratis</a>
        <a className='btn btn-secondary'>Ver más</a>
      </div>
    </div>

    <div>
      <h2>Platenences</h2>
      <div className="cards">
        { cards.map(card => {
          return (
            <div key={card}>
              <img height="256" src="/static/card.jpg" width="180" />
            </div>
            )
          }) }
      </div>
    </div>

    <div className='row'>
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
      .hero-cover {
        align-items: center;
        background-image: url(/static/napoleon.png);
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        height: 640px;
      }
      .hero-description {
        margin-left: 100px;
        width: 520px;
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
      .cards {
        display: grid;
        grid-gap: 22px;
        height: 256px;
        grid-template-columns: repeat(7, 1fr);
        overflow: hidden;
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
      .row {
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
