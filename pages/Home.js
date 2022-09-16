import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/button'
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
import { TENANT } from "~/constants/constants"
import Cookie from '~/components/cookie/index'

const HomePage = ({ contents, featuredMedia, featuredMediaError, media, layoutProps }) => {

  const { user, autoLogin } = useContext(UserContext)
  const { appName: pageTitle } = CONFIG
  let [idx, setIdx] = useState(0)
  console.log('autologin: ', autoLogin)
  console.log('config.autologin: ', CONFIG.isAutoLogin)

  return (
    <Layout paddingTop={ false } { ...layoutProps } media={ featuredMedia }>
      <Head>
        <title>{ pageTitle }</title>
        <link rel="apple-touch-icon" sizes="180x180" href={ `/static/${ TENANT }/favicon/favicon-180x180.png` }/>
        <link rel="icon" type="image/png" sizes="32x32" href={ `/static/${ TENANT }/favicon/favicon-32x32.png` }/>
        <link rel="icon" type="image/png" sizes="16x16" href={ `/static/${ TENANT }/favicon/favicon-16x16.png` }/>
        <link rel="manifest" href={ `/static/${ TENANT }/favicon/site.webmanifest` }/>
        <link rel="mask-icon" href={ `/static/${ TENANT }/favicon/safari-pinned-tab.svg` } color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <div className="index">
        <Cookie/>
        {/* cover */ }
        <Cover error={ featuredMediaError } media={ featuredMedia }/>
        {/* <Cover media={featuredMedia} /> */ }

        {/* contents */ }
        <div className="index__contents">
          { contents && contents.map((item, index) => {
            const showBanner = (item.is_paid && user || !item.is_paid && !user)
            const { contentable_type: contentableType } = item
            switch (contentableType) {
              case 'categories':
                if (item.slug == 'live-streaming') {
                  return <LiveSection api={ api } category={ item.slug } key={ index } idx={ index }/>
                }
                return <HomeCarouselSection api={ api } category={ item.slug } key={ index } idx={ index }/>
              case 'banners':
                return showBanner && <BannerSection id={ item.contentable_id } key={ index }/>
              case 'movies':
                return showBanner && <BannerSection movie={ item.slug } key={ index }/>
            }
          }) }
        </div>

      </div>
      <style jsx>{ `
        .index {
          margin-bottom: 75px;
        }
        .index__contents {
          position: relative;
          z-index: 2;
          padding-bottom: 4em;
          padding-top: 2em;
        }

        .home-carousel-section:first-child {
          padding: 3.5em 0;
        }
        @media (min-width: 768px) {
          .index {
            margin-bottom: 30px;
          }
        }
      ` }</style>
    </Layout>
  )
}

HomePage.getInitialProps = async ctx => {
  // const { api } = ctx
  const { data: homePage } = await api().get('pages/home');

  try {
    const [firstContent, ...contents] = homePage.contents
    const { data: { movie: featuredMedia } } = await api().get('movie/' + firstContent.slug + '?for=home-cover')

    // typeof window !== 'undefined'
    //   ? Router.push('/signup')
    //   : ctx.res.writeHead(302, { Location: '/signup' }).end()

    return { contents, featuredMedia }
  } catch (error) {
    const [...contents] = homePage.contents;
    return { contents, featuredMediaError: error };
  }

}

export default withApi(HomePage)
//  export default HomePage

const CoverImgContent = styled.div`
  background-image:
    linear-gradient(to bottom, ${ props => Color(props.theme.colors.background).fade(1).string() } 80%, ${ props => props.theme.colors.background } 100%),
    url('${ props => props.posterUrl }');
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
      linear-gradient(to bottom, ${ props => Color(props.theme.colors.background).fade(1).string() } 65%, ${ props => props.theme.colors.background } 100%),
      url('${ props => props.posterUrl }');
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
  const empezaYa = CONFIG.lang === 'es-CL' ? '¡Vívelo ahora!' : '¡Empieza Ya!'
  return (

    <Link href={ media && media.video_file ? `/media/${ media.slug }/watch` : '/' }>


      <div className="cover container-fluid">

        {/* poster backaground banner image */ }

        { poster_url && (
          <div className="cover__img row">
            <div className="col p-0">

              <CoverImgContent posterUrl={ poster_url }>

                <img alt="" className="d-none" src={ poster_url }/>

              </CoverImgContent>


            </div>
          </div>
        )
        }


        <div className="cover__contents row">
          <div className="col-12 col-md-4 offset-md-1" style={ { height: "100%", marginTop: "30px" } }>
            <div className="cover__infos">

              {/* logo overlay image */ }
              { logo && (
                <div className="row">
                  <div className="col-8 offset-2 col-md-12 offset-md-0">
                    <picture>
                      <source srcSet={ webp } type="media/webp"/>
                      <source srcSet={ png } type="media/png"/>
                      <img src={ fallback } width="230px" style={ { marginBottom: "20px" } }/>
                    </picture>
                  </div>
                </div>
              ) }

              {/* content's description */ }
              { description && (
                <div className="row cover__description">
                  <div className="col-10 offset-1 col-md-12 offset-md-0">
                    <p className="mb-0">{ description }</p>
                  </div>
                </div>
              ) }

            </div>

            {/* cta buttons */ }
            <div className="row justify-content-center justify-content-md-start gutter-15">
              { !user ? (
                <div className="col-auto">
                  <Link href="/signup" passHref>
                    <Button>Assista Agora</Button>
                  </Link>
                </div>
              ) : <>
                <div className="col-auto">
                  <MediaLink { ...{ media } } passHref>
                    <Button>Mira</Button>
                  </MediaLink>
                </div>
                <div className="col-auto">
                  <WishlistBtn movieId={ media.id }/>
                </div>
              </> }
            </div>
          </div>

        </div>
        {/* styles */ }
        <style jsx>{ `
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
          padding-bottom: ${ logo ? height * 100 / width + '%' : 0 };
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
            margin-bottom: 15px;
          }
        }
      ` }</style>

      </div>
    </Link>
  )
}

const HomeCarouselSection = ({ api, category: categorySlug, idx }) => {

  const [category, setCategory] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { lang } = CONFIG

  useEffect(() => {
    async function fetchData() {
      setError(false)
      setLoading(true)
      try {
        const { data } = await api().get(`category/${ categorySlug }`)
        console.log(data);
        setCategory(data)
      } catch (error) {
        const errorMessage = ['es', 'es-CL'].includes(lang) ? 'Error al intentar cargar la categoría'
          : 'Error trying to load category'
        setError(errorMessage)
      }
      setLoading(false)
    }

    fetchData()
  }, [categorySlug])

  // alert(key)
  return (
    <>
      <div className="home-carousel-section">
        { loading ? (
          <div className="text-center">
            <Loading loadingState={ loading }/>
          </div>
        ) : category ? (
          <CarouselSection category={ category } idx={ idx }/>
        ) : error && (
          <div className="text-center">
            { error }
          </div>
        ) }
      </div>
      <br></br>
      <style jsx>{ `
        .home-carousel-section {
            //margin-bottom: 75px;
            //margin-top: 75px;
            //padding: 1.5em 0;
            //overflow: hidden;
        }
        @media (min-width: 768px) {
          .home-carousel-section {
            //margin-bottom: 55px;
          }
        }
      ` }</style>
    </>
  )
}

const BannerSection = ({ id, movie }) => {
  const [banner, setBanner] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const { data } = await (id ? api().get(`/banners/${ id }`) : api().get(`/movie/${ movie }`))
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

        {/* loading */ }
        <div className="text-center">
          <Loading loadingState={ loading }/>
        </div>

        {/* features */ }
        { banner && id &&
        <a className="sponsor-link" href={ banner.link } target="_blank">
          <Featured img={ banner.banner_url }/>
        </a>
        }

        { banner && movie &&
        <MediaLink media={ banner.movie } passHref>
          <a>
            <Featured
              className="gradient"
              img={ banner.movie.poster_url }
            />
          </a>
        </MediaLink>
        }

        {/* error */ }
        { error && (
          <div className="text-center">Error</div>
        ) }

      </div>
      <style jsx>{ `
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
      ` }</style>
    </div>
  );
}


const LiveSection = ({ api, category: categorySlug, idx }) => {

  const [category, setCategory] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const { lang } = CONFIG

  useEffect(() => {
    async function fetchData() {
      setError(false)
      setLoading(true)
      try {
        const { data } = await api.get(`category/${ categorySlug }`)
        console.log(data);
        setCategory(data)
      } catch (error) {
        const errorMessage = ['es', 'es-CL'].includes(lang) ? 'Error al intentar cargar la categoría'
          : 'Error trying to load category'
        setError(errorMessage)
      }
      setLoading(false)
    }

    fetchData()
  }, [categorySlug])

  // alert(key)
  return (
    <>
      <div className="home-carousel-section live">

        { loading ? (
          <div className="text-center">
            <Loading loadingState={ loading }/>
          </div>
        ) : category ? (
          <CarouselSection category={ category } idx={ idx }/>
        ) : error && (
          <div className="text-center">
            { error }
          </div>
        ) }
      </div>
      <br></br>
      <style jsx>{ `
        .home-carousel-section {
            //margin-bottom: 75px;
            //margin-top: 75px;
            //padding: 1.5em 0;
            //overflow: hidden;
        }
        @media (min-width: 768px) {
          .home-carousel-section {
            //margin-bottom: 55px;
          }
        }
      ` }</style>
    </>
  )
}
