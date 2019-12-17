// next imports
import Head from 'next/head'
import Link from 'next/link'

// react imports
import React, { useContext, useEffect, useState } from 'react'

// app imports
import Button from '../components/button'
import MediaCard from '../components/MediaCard/MediaCard'
import CarouselSection from '../components/carousel-section'
import Featured from '../components/featured'
import Layout from '../components/layout/Layout'
import Loading from '../components/Loading/Loading'
import WishlistBtn from '../components/wishlist-btn'
import UserContext from '../components/UserContext'
import { STATIC_PATH, TENANT } from '../constants/constants'
import { CONFIG } from '../config'
import api from '../services/api'

// home page
const Home = ({ layoutProps }) => {
  const { user } = useContext(UserContext)
  return (
    <Layout {...layoutProps} paddingTop={false}>
      <Head>
        <title>{CONFIG.appName}</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover />

        {/* supporters */}
        <HomeCarouselSection category="supporters" />

        {/* arts */}
        <HomeCarouselSection category="arts" />

        {/* featured */}
        { (user)? <BannerSection  bannerID="1" movieID="13"/> : <BannerSection bannerID="6"/> }

        {/* podcasts */}
        <HomeCarouselSection category="podcasts" />

        {/* features */}
        { (user)? <BannerSection  bannerID="2" movieID="14"/> : <BannerSection bannerID="5"/> }

        {/* news */}
        <HomeCarouselSection category="news" />

        {/* features */}
        { (user)? <BannerSection  bannerID="3" movieID="15" /> : <BannerSection bannerID="7"/> }

        {/* family */}
        <HomeCarouselSection category="family" />

        { (user)? <BannerSection  bannerID="4" movieID="16"/> : <BannerSection bannerID="8"/> }

        {/* children */}
        <HomeCarouselSection category="children" />

      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .index {
            padding-bottom: 30px;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Home

// cover
const Cover = _ => {
  const { user } = useContext(UserContext)
  return (
    <div className="cover">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-8 col-md-5">
            <div className="description">
              <h1 className="h1">
                <span className="h1-a">Entrevista a nuestro</span>
                <strong className="h1-b">{
                  TENANT === 'dalecampeon' ? `“Napoléon”` : `Comandante`
                }</strong>
                <span className="h1-c">{
                  TENANT === 'dalecampeon' ? 'Marcelo Gallardo' : 'Mario Salas'
                }</span></h1>
              { ! user ? (
                <>
                  <Link href="/subscriptor" passHref>
                    <Button>Probar Gratis</Button>
                  </Link>
                  <Link href="/movies" passHref>
                    <Button color="secondary" outline>Ver más</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/movies" passHref>
                    <Button>Ver más</Button>
                  </Link>
                  <WishlistBtn movieId={17} />
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
          font-size: 31px;
          font-weight: normal;
          line-height: .98;
          margin-top: 0;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        @media (min-width: 768px) {
          .h1 {
            font-size: 62px;
          }
        }
        .h1-a {
          position: relative;
          z-index: 2;
        }
        .h1-b {
          color: var(--primary);
          font-family: 'Bebas Neue';
          font-size: 2.24em; /* 139px */
          font-weight: bold;
          margin-left: -50px;
          position: relative;
          z-index: 1;
        }
        .h1-c {
          font-size: 1.16em;
          margin-top: -.20em; /* -15px */
        }
      `}</style>
    </div>
  )
}

// carousel sections
const HomeCarouselSection = ({ category: categorySlug }) => {
  const [category, setCategory] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  // fetch data
  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const {data} = await api.get(`/category/${categorySlug}`)
        setCategory(data)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [categorySlug])

  // return
  return (
    <div>
      <div className="section">

        {/* loading */}
        <div className="text-center">
          <Loading loadingState={loading} />
        </div>

        {/* category */}
        {!loading && category && category.name && (
          <CarouselSection title={category.name}>
            {category.movies.length &&
              category.movies.map((media, key) => (
                <MediaCard {...{category, key, media}} />
              ))
            }
          </CarouselSection>
        )}

        {/* error */}
        {error && (
          <div className="text-center">Error</div>
        )}

      </div>
      <style jsx>{`
        .section {
          margin-bottom: 25px;
        }
        @media (min-width: 768px) {
          .section {
            margin-bottom: 55px;
          }
        }
      `}</style>
    </div>
  )
}

const BannerSection = ({bannerID: id, movieID}) => {
  const [banner, setBanner] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const {data} = await api.get(`/banners/${id}`)
        setBanner(data)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [id])

  return (
    <div>
      <div className="section">

        {/* loading */}
        <div className="text-center">
          <Loading loadingState={loading} />
        </div>

        {/* features */}
        { (banner) && (
              <div>
            {(!movieID)? (
                    <a className="sponsor-link" href={banner.link} target="_blank">
                      <Featured img={banner.banner_url} />
                    </a>
            ) :
            (
             <Featured img={banner.banner_url}>
              <div className="buttons">
                <Link href={banner.link} passHref>
                  <Button>Ver más</Button>
                </Link>
                <WishlistBtn movieId={movieID} />
              </div>
              </Featured>
            )}
            </div>
        )}

        {/* error */}
        {error && (
          <div className="text-center">Error</div>
        )}

      </div>
      <style jsx>{`
        .sponsor-link {
          color: white !important;
          text-decoration: none;
        }
        .sponsor-link:hover {
          color: white !important;
          text-decoration: none;
        }
        a:not([href]):not([tabindex]):hover {
          color: white !important;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
