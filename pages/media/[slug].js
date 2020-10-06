import { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Collapse from 'react-bootstrap/Collapse'
import Button from '~/components/button'
import Layout from '~/components/layout/Layout'
import MediaLink from '~/components/MediaLink/MediaLink'
import WishlistBtn from '~/components/wishlist-btn'
import withApi from '~/components/withApi'
import UserContext from '~/contexts/UserContext'
import { CONFIG } from '~/config'
import Chevron from '~/components/icons/chevron'
import Color from 'color'
import { TENANT } from "~/constants/constants";
import LogoApp from '~/components/LogoApp'

function MediaPage1({ category, errorCode, layoutProps, media, related }) {
  const { appName } = CONFIG
  const { title: mediaTitle } = media
  const pageTitle = `${mediaTitle} < ${appName}`


  return (
    <>
      <Layout errorCode={errorCode} paddingTop={false} {...layoutProps}>
        <Head>
          <title>{pageTitle}</title>
        </Head>

        <Cover category={category} media={media} />
        {category && related && (
          <More category={category} related={related} />
        )}
      </Layout>
      <style jsx global>{`
        .footer {
            padding-bottom: 0px !important;
            margin-top: 57px !important;
         }
      `}</style>
    </>
  )
}


MediaPage1.getInitialProps = async ctx => {
  const { api, query } = ctx
  const { slug: movieSlug, category: categorySlug } = query;
  try {
    const url = `movie/${movieSlug}` + (categorySlug ? `/category/${categorySlug}` : '')
    const { data } = await api.get(url)
    const { category, movie: media, related } = data
    return { category, media, related }
  } catch (error) {
    const errorCode = 404
    return { errorCode }
  }
}


const Cover = ({ category, media }) => {
  const [open, setOpen] = useState(false)
  const { user } = useContext(UserContext)
  const smDown = useMediaQuery('(max-width: 767px)')
  const probaGratis = CONFIG.lang === 'es-CL' ? 'Prueba gratis' : 'Probá Gratis'
  const theme = useContext(ThemeContext)
  const maskColor = Color(theme.colors.background)

  const {
    detail = null,
    poster_url: posterUrl,
    logo_url: {
      default: defaulturl,
      png: png,
      webp: web
    },


    publish_year: publishYear = null,
    title,
  } = media;
  console.log(defaulturl);
  return (

    <div>
      <div className="header-entre">
        <h3>{category.name}</h3>
      </div>

      <div className="cover container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 offset-md-1">
            <MediaLink {...{ category, media }} watch>



              <div className="heading">
                <h1 className="h2">
                  <img className="image-logo" src={defaulturl}></img>
                </h1>
                {publishYear && (
                  <div className="year">{publishYear}</div>
                )}


                {detail && (
                  <div className="description" style={{ display: 'flex' }}>
                    <div className={smDown && !open && 'short-description'}>
                      {smDown && !open && detail.replace(/^([\s\S]{70}[^\s]*)[\s\S]*/, "$1")}
                      <Collapse in={open || !smDown}>
                        <p>{detail}</p>
                      </Collapse>
                    </div>
                    <div
                      className={'chevron-collapse ' + (!smDown && 'd-none')}
                      onClick={_ => setOpen(!open)}
                      aria-controls="description"
                      aria-expanded={open}
                    >
                      <Chevron
                        dir={!open && "bottom"}
                        alt="mas" className="chevron"
                        height="10" width="17"
                        inline
                      />
                    </div>
                  </div>
                )}
              </div>
            </MediaLink>


            <div className="buttons">

              {!user ? (
                <Link href={TENANT === 'lau' ? "/subscriptor" : "/signup"}>
                  <Button block={smDown}>{probaGratis}</Button>
                </Link>
              ) : (
                  <>
                    <MediaLink {...{ category, media }} watch>
                      <Button>Mira</Button>
                    </MediaLink>
                    <WishlistBtn movieId={media.id} />
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`

        .image-logo {
          max-width:37%;
        }

        .cover {
          background-color: var(--background);
          background-position: 50% 50%, 100% 50%;

          background-image: url(${posterUrl});
          background-repeat: no-repeat, no-repeat;
          background-size: cover, cover;
          font-size: 15px;
          line-height: 1.5;
        }
        .cover .row {
          padding-top: calc(var(--padding-top) + 15px);
          padding-bottom: 15px;
        }
        .heading {
          margin-bottom: 15px;
        }
        h1 {
          font-size: 31px;
          font-weight: bold;
          line-height: normal;
          margin-bottom: 0;
        }
        .year {
          font-size: 1.33em;
        }
        .description {
          color: var(--descriptions-color);
        }
        .short-description {
          margin-bottom: 100px;
        }
        .short-description :after {
            content: " . . .";
        }
        .cover :global(.btn-primary) {
          margin-right: 15px;
          margin-bottom: 0;
        }
        .chevron-collapse {
          padding-left: 10px;
        }
        .header-entre {
          display:none;
        }
        @media (min-width: 768px) {

        .image-logo {
          max-width:37%;
        }
          .cover .row {
            height: 560px;
            padding-top: var(--padding-top);
            padding-bottom: 30px;
          }
          .info {
            margin-bottom: 30px;
          }
          .description:after {
            content: "";
          }
        }

        @media(max-width:768px){
        .cover {
          background-image: url(${ posterUrl});
        }
          .buttons {
            display:none!important;
          }
          h1 {
            text-align: center;
            font-size: 18px;
            padding: 161px 0px 18px 0px;
          }
          .heading {
            margin-bottom: -19px;
          }
          .container-fluid, .container-sm, .container-md, .container-lg, .container-xl {
            width: 90%;
            padding-right: 15px;
            padding-left: -13px;
           }

           h3 {
            padding-left: 8px;
            font-size: 22px;
            font-weight: 600;
           }

          .header-entre{
           background:#090a0a;;
           display:block;
           margin-top: 30%;
           padding-left: 10px;
          }
        }
      ` }</style>
    </div >

  )
}

const HMediaCard = ({ category, media }) => {
  const { title } = media
  return (
    <div className="h-media-card row">
      <div className="col-md-4">
        <MediaLink watch {...{ category, media }}>
          <a>
            <img
              className="img-fluid w-100 d-block"
              height="220"
              src={media.thumbnail2_url ? media.thumbnail2_url : '//placehold.jp/390x220.png'}
              width="390"
            />
          </a>
        </MediaLink>
      </div>
      <div className="col-md-5">
        <h3 className="h3">
          <MediaLink watch {...{ category, media }}>
            <a>{title}</a>
          </MediaLink>
        </h3>
        {media.detail && (
          <div className="description">
            <p>{media.detail}</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .h-media-card {
          margin-bottom: 30px;
        }
        .h-media-card a {
          color: var(--white);
          text-decoration: none;
        }
        .h-media-card img {
          margin-bottom: 15px;
        }
        .h3 {
          font-size: inherit;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .h3 a:focus,
        .h3 a:hover {
          text-decoration: underline;
        }
        .description {
          color: var(--descriptions-color);
          font-size: 15px;
        }
        @media (min-width: 768px) {
          .h-media-card {
            margin-bottom: 45px;
          }
          .h-media-card img {
            margin-bottom: 0;
          }
        }
      ` }</style>
    </div>
  )
}


const More = ({ category, related: medias }) => {
  const { name: categoryName } = category
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.backgroundContrast).hsl().string()
  const [display, setDisplay] = useState("none")

  function visible() {

    if (display == "block") {
      setDisplay("none")
    } else {
      setDisplay("block")
    }
  }

  return (

    <>
      <div className="is_visivel">
        <a onClick={() => visible()} className="btn-mas btn-primary">Ver Más</a>
        <style jsx>{`
          .is_visivel {
            display:none;
            padding:24px;
          }
         @media (max-width:768px) {
           .is_visivel {
             display:flex;
             justify-content: center;
           }
           .btn-mas {
             font-weight: 700;
             background-color: var(--primary);
             border:0px;
             border-radius: 4px;
             padding: 5px;
             width: 28%;
             text-align: center;
             font-size: 14px;
           }
         }


      ` }</style>
      </div>

      <div className="more container-fluid">

        <div className="row">
          <div className="col offset-md-1">
            <h2 className="h2 text-uppercase">Más {categoryName}</h2>
          </div>
        </div>
        <div className="cards">
          {medias.map((media, i) => (
            <HMediaCard key={i} {...{ category, media }} />
          ))}
        </div>
        <style jsx>{`
        .more {
          background-color: ${ backgroundColor};
          font-size: 20px;
          line-height: 1.5;
          padding-top: 30px;
        }
        .h2 {
          font-size: 30px;
          margin-top: 0;
          margin-bottom: 30px;
        }


        .cards {
          overflow: hidden;
        }
        @media (max-width:768px) {
          .more {
            padding-top: 45px;
          }


          .h2 {
            font-size: 31px;
            margin-bottom: 60px;
            display:none;

          }
          .cards {
            padding-left: 4%;


          }
          .container-fluid {
            display:flex;
            justify-content:center;
              display: ${ display};
          }
        }
      ` }</style>
      </div>
    </>

  );
}

export default withApi(MediaPage1)
