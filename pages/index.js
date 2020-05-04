import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
import MediaCard from '../components/MediaCard/MediaCard'
import CarouselSection from '../components/carousel-section'
import Featured from '../components/featured'
import Layout from '../components/layout/Layout'
import Loading from '../components/Loading/Loading'
import MediaLink from '../components/MediaLink/MediaLink'
import WishlistBtn from '../components/wishlist-btn'
import UserContext from '../contexts/UserContext'
import { CONFIG } from '../config'
import api from '../services/api'
import withApi from '~/components/withApi'
import Color from 'color'

const HomePage = ({ contents, featuredMedia, featuredMediaError, layoutProps }) => {
  const { user } = useContext(UserContext)
  return (
    <Layout {...layoutProps} paddingTop={false}>
      <Head>
        <title>{CONFIG.appName}</title>
      </Head>
      <div className="index">

        {/* cover */}
        <Cover error={featuredMediaError} media={featuredMedia} />

        {/* Contents */}
        <div className="index__contents">
          {contents && contents.map((item, index) => {
            let showBanner = (item.is_paid && user || !item.is_paid && !user)
            switch(item.contentable_type) {
              case 'categories':  return <HomeCarouselSection category={item.slug} key={index} />
              case 'banners':     return showBanner && <BannerSection id={item.contentable_id} key={index} />
              case 'movies':      return showBanner && <BannerSection movie={item.slug} key={index} />
            }
          })}
        </div>

      </div>
      <style jsx>{`
        .index {
          margin-bottom: 75px;
        }
        .index__contents {
          position: relative;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .index {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </Layout>
  )
}

HomePage.getInitialProps = async ctx => {
  try {
    const { data: home_page } = await ctx.api.get('pages/home')
    const [firstContent,...contents] = home_page.contents
    const { data: { movie: featuredMedia } } = await ctx.api.get('movie/' + firstContent.slug + '?for=home-cover')
    return { contents, featuredMedia }
  } catch (error) {
    return { featuredMediaError: error }
  }
}

export default withApi(HomePage)

const CoverImgContent = styled.div`
  background-image:
    linear-gradient(to bottom, ${props => Color(props.theme.colors.background).fade(1).string()} 80%, ${props => props.theme.colors.background} 100%),
    radial-gradient(circle at 50% 50%, ${props => Color(props.theme.colors.background).fade(1).string()} 25%, ${props => Color(props.theme.colors.background).fade(.075).string()} 75%),
    url('${props => props.posterUrl}');
  background-position: 50% 0, 50% 0, 75% 0;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: cover, cover, cover;
  &::before {
    content: '';
    display: block;
    padding-bottom: 112.5%;
  }
  @media (min-width: 768px) {
    background-image:
      linear-gradient(to bottom, ${props => Color(props.theme.colors.background).fade(1).string()} 80%, ${props => props.theme.colors.background} 100%),
      radial-gradient(circle at 67.5% 57.5%, ${props => Color(props.theme.colors.background).fade(1).string()} 25%, ${props => Color(props.theme.colors.background).fade(.075).string()} 42.5%),
      url('${props => props.posterUrl}');
    background-position: 50% 0, 50% 0, 40% 50%;
    &::before {
      padding-bottom: 80%;
    }
  }
  @media (min-width: 1200px) {
    background-position: 50% 0, 50% 0, 75% 50%;
    &::before {
      padding-bottom: 48%;
    }
  }
`
// ${props.theme.colors.background}

const Cover = ({ error, media }) => {
  if (error) {
    return (
      <p>No se puede cargar contenido destacado</p>
    )
  }
  const { user } = useContext(UserContext)
  const { description, logo, poster_url } = media || {}
  const {
    height,
    url: { default: fallback, png, webp } = {},
    width,
  } = logo || {}
  const empezaYa = CONFIG.lang === 'es-CL' ? '¡Vívelo ahora!' : '¡Empezá Ya!'
  return (
    <div className="cover container-fluid">

      {/* poster backaground banner image */}
      <div className="cover__img row">
        <div className="col p-0">
          <CoverImgContent posterUrl={poster_url}>
            <img alt="" className="d-none" src={poster_url} />
          </CoverImgContent>
        </div>
      </div>

      <div className="cover__contents row">
        <div className="col-12 col-md-4 offset-md-1">
          <div className="cover__infos">

            {/* logo overlay image */}
            {logo && (
              <div className="row">
                <div className="col-8 offset-2 col-md-12 offset-md-0">
                  <h1 className="cover__logo">
                    {<picture>
                      <source srcSet={webp} type="media/webp" />
                      <source srcSet={png} type="media/png" />
                      <img className="img-fluid" height={height} src={fallback} width={width} />
                    </picture>}
                  </h1>
                </div>
              </div>
            )}

            {/* content's description */}
            {description && (
              <div className="row cover__description">
                <div className="col-10 offset-1 col-md-12 offset-md-0">
                  <p className="mb-0">{description}</p>
                </div>
              </div>
            )}

          </div>

          {/* cta buttons */}
          <div className="row justify-content-center gutter-15">
            { ! user ? (
              <div className="col-auto">
                <Link href="/subscriptor" passHref>
                  <Button>{empezaYa}</Button>
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
          padding-bottom: ${logo ? height * 100 / width + '%' : 0};
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
        const {data} = await api().get(`/category/${categorySlug}`)
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

const BannerSection = ({id, movie}) => {
  const [banner, setBanner] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const { data } = await (id ? api().get(`/banners/${id}`) : api().get(`/movie/${movie}`))
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
        { banner && id &&
          <a className="sponsor-link" href={banner.link} target="_blank">
            <Featured img={banner.banner_url} />
          </a>
        }

        { banner && movie &&
          <MediaLink media={banner.movie} passHref>
            <a>
              <Featured
                className="gradient"
                img={banner.movie.poster_url}
              />
            </a>
          </MediaLink>
        }

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
