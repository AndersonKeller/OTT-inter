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
import MediaLink from '../components/MediaLink/MediaLink'
import WishlistBtn from '../components/wishlist-btn'
import UserContext from '../components/UserContext'
import { CONFIG } from '../config'
import api from '../services/api'

// home page
const Home = ({ featuredMedia, featuredMediaError, layoutProps }) => {

  // get user
  const { user } = useContext(UserContext)

  // return
  return (
    <Layout {...layoutProps} paddingTop={false}>
      <Head>
        <title>{CONFIG.appName}</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover error={featuredMediaError} media={featuredMedia} />

        <div className="index__contents">

          {/* supporters */}
          <HomeCarouselSection category="supporters" />

          {/* featured */}
          { (user)? <BannerSection  bannerID="1" movieID="13"/> : <BannerSection bannerID="6"/> }

          {/* arts */}
          <HomeCarouselSection category="arts" />

          {/* features */}
          { (user)? <BannerSection  bannerID="2" movieID="14"/> : <BannerSection bannerID="5"/> }

          {/* podcasts */}
          <HomeCarouselSection category="podcasts" />

          {/* features */}
          { (user)? <BannerSection  bannerID="3" movieID="15" /> : <BannerSection bannerID="7"/> }

          {/* news */}
          <HomeCarouselSection category="news" />

          { (user)? <BannerSection  bannerID="4" movieID="16"/> : <BannerSection bannerID="8"/> }

          {/* family */}
          <HomeCarouselSection category="family" />

          { (!user)? <BannerSection  bannerID="9" /> : "" }

          {/* children */}
          <HomeCarouselSection category="children" />

          { (!user)? <BannerSection  bannerID="10" /> : "" }


        </div>
      </div>

      {/* styles */}
      <style jsx>{`
        .index__contents {
          position: relative;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .index {
            padding-bottom: 30px;
          }
        }
      `}</style>

    </Layout>
  )
}

Home.getInitialProps = async _ => {
  try {
    const { data: { movie: featuredMedia } } = await api.get('movie/marcelo-gallardo-lo-jugamos-como-una-final?for=home-cover')
    return { featuredMedia }
  } catch (error) {
    console.log(error)
    return { featuredMediaError: error }
  }
}

export default Home

// home cover
const Cover = ({ error, media }) => {

  // get user
  const { user } = useContext(UserContext)

  // in case of errors
  if (error) {
    return (
      <p>No se puede cargar contenido destacado</p>
    )
  }

  // return
  return (
    <div className="cover container-fluid">

      {/* image */}
      <div className="cover__img row">
        <div className="col p-0">
          <div className="cover__img-content">
            <img alt="" className="d-none" src={media.poster_url} />
          </div>
        </div>
      </div>

      <div className="cover__contents row">
        <div className="col-12 col-md-4 offset-md-1">
          <div className="cover__infos">

            {/* logo */}
            <div className="row">
              <div className="col-8 offset-2 col-md-12 offset-md-0">
                <h1 className="cover__logo">
                  <img
                    className="img-fluid"
                    height={media.logo.height}
                    src={media.logo.url}
                    width={media.logo.width}
                  />
                </h1>
              </div>
            </div>

            {/* description */}
            {media.description && (
              <div className="row cover__description">
                <div className="col-10 offset-1 col-md-12 offset-md-0">
                  <p className="mb-0">{media.description}</p>
                </div>
              </div>
            )}

          </div>

          {/* buttons */}
          <div className="row justify-content-center justify-content-md-start gutter-15">
            { ! user ? (
              <div className="col-auto">
                <Link href="/subscriptor" passHref>
                  <Button>Probar Gratis</Button>
                </Link>
              </div>
            ) : <>
              <div className="col-auto">
                <MediaLink {...{media}} passHref>
                  <Button>Mira</Button>
                </MediaLink>
              </div>
              <div className="col-auto">
                <WishlistBtn movieId={media.id} />
              </div>
            </> }
          </div>

        </div>
      </div>

      {/* styles */}
      <style jsx>{`
        .cover {
          font-size: 12px;
          line-height: 1.4;
          margin-bottom: 15px;
          overflow: hidden;
          padding-bottom: 15px;
          position: relative;
          text-align: center;
          z-index: 1;
        }
        .cover__img {
          margin-bottom: -90px;
        }
        .cover__img-content {
          background-image:
            linear-gradient(to bottom, rgba(0,0,0,0) 80%, black 100%),
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 25%, rgba(0,0,0,.925) 75%),
            url(${media.poster_url});
          background-position: 50% 0, 50% 0, 75% 0;
          background-repeat: no-repeat, no-repeat, no-repeat;
          background-size: cover, cover, cover;
        }
        .cover__img-content::before {
          content: '';
          display: block;
          padding-bottom: 112.5%;
        }
        .cover__infos {
          margin-bottom: 15px;
        }
        .cover__logo {
          margin-top: 0;
          margin-bottom: 15px;
          position: relative;
        }
        .cover__logo::before {
          content: '';
          display: block;
          padding-bottom: ${media.logo.height * 100 / media.logo.width + '%'};
        }
        .cover__logo img {
          left: 0;
          position: absolute;
          top: 0;
        }
        @media (min-width: 768px) {
          .cover {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: -60px;
            text-align: left;
          }
          .cover__img {
            margin-bottom: 0;
          }
          .cover__img-content {
            background-image:
              linear-gradient(to bottom, rgba(0,0,0,0) 80%, black 100%),
              radial-gradient(circle at 67.5% 57.5%, rgba(0,0,0,0) 25%, rgba(0,0,0,.925) 42.5%),
              url(${media.poster_url});
            background-position: 50% 0, 50% 0, 40% 50%;
          }
          .cover__img-content::before {
            padding-bottom: 80%;
          }
          .cover__contents {
            align-items: center;
            height: 100%;
            padding-top: var(--padding-top);
            padding-bottom: 60px;
            position: absolute;
            width: 100%;
            top: 0;
          }
          .cover__infos {
            margin-bottom: 30px;
          }
        }
        @media (min-width: 1200px) {
          .cover__img-content {
            background-position: 50% 0, 50% 0, 75% 50%;
          }
          .cover__img-content::before {
            padding-bottom: 48%;
          }
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
