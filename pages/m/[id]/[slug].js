import Error from 'next/error'
import Head from 'next/head'
import Link from 'next/link'
import { useContext } from 'react'

import Button from '../../../components/button'
import Layout from '../../../components/layout/Layout'
import MiLista from '../../../components/mi-lista'
import UserContext from '../../../components/UserContext'
import { CONFIG } from '../../../config'
import { TENANT, STATIC_PATH } from '../../../constants/constants'
import { api } from '../../../services/api'

function MediaPage1({ category, errorCode, layoutProps, media }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  return (
    <Layout {...layoutProps} paddingTop={false}>
      <Head>
        <title>{media.title} &lt; {CONFIG.appName}</title>
      </Head>
      <Cover {...{media}} />
      <More {...{category}} />
    </Layout>
  );
}

MediaPage1.getInitialProps = async (context) => {
  const {id, slug} = context.query;
  try {
    const response = await api.get(`/movie/${id}/category/${slug}`)
    const {category, movie} = response.data
    return { category, media: movie }
  } catch (error) {
    const errorCode = 404
    return { errorCode }
  }
}

const Cover = ({media}) => {
  const { user } = useContext(UserContext)
  if (TENANT === 'dalecacique') {
    media.title = 'Mano a mano con Esteban Paredes'
    media.detail = `El capitán albo tuvo un mano a mano con ${CONFIG.appName}, donde contó sobre todo lo que rodea al delantero albo.`
  }
  return (
  <div className="cover container-fluid" style={{
    backgroundImage: [
      'url(/static/inside-cover-gradient.png)',
      `url(${media.poster_url})`,
    ],
  }}>
    <div className="row align-items-center">
      <div className="col-12 col-md-5 offset-md-1">
        <div className="info">
          <h1>{media.title}</h1>
          {media.publish_year && (
            <div className="year">{media.publish_year}</div>
          )}
          {media.detail && (
            <div className="description">
              <p>{media.detail}</p>
            </div>
          )}
        </div>
        <Link href={`/media-inside-2-${user ? 'private' : 'public'}`}>
          <Button>Proba Gratis</Button>
        </Link>
        <MiLista />
      </div>
    </div>
    <style jsx>{`
      .cover {
        background-color: #0a0b11;
        background-position: 50% 50%, 100% 50%;
        background-repeat: no-repeat, no-repeat;
        background-size: cover, contain;
        font-size: 20px;
        line-height: 1.5;
      }
      .cover .row {
        padding-top: calc(var(--padding-top) + 15px);
        padding-bottom: 15px;
      }
      h1 {
        font-size: 31px;
        line-height: normal;
        margin-bottom: 0;
      }
      .info {
        margin-bottom: 30px;
      }
      .cover :global(.btn-primary) {
        margin-bottom: 15px;
      }
      @media (min-width: 768px) {
        .cover .row {
          height: 560px;
          padding-top: 110px;
        }
        .info {
          margin-bottom: 50px;
        }
        .cover :global(.btn-primary) {
          margin-right: 15px;
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
)}

const HMediaCard = ({category, media}) => (
  <div className="h-media-card row align-items-center">
    <div className="col-md-4">
      <Link as={`/m/${media.id}/${category.slug}`} href="/m/[id]/[slug]">
        <a>
          <img
            className="img-fluid w-100 d-block"
            height="220"
            src={media.thumbnail2_url ? media.thumbnail2_url : 'http://placehold.jp/390x220.png'}
            width="390"
          />
        </a>
      </Link>
    </div>
    <div className="col-md-7">
      <h3 className="h3">
        <Link as={`/m/${media.id}/${category.slug}`} href="/m/[id]/[slug]">
          <a>{media.title}</a>
        </Link>
      </h3>
      {media.detail && (
        <p>{media.detail}</p>
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
        margin-top: 0;
        margin-bottom: 0;
      }
      .h3 a:focus,
      .h3 a:hover {
        text-decoration: underline;
      }
      @media (min-width: 768px) {
        .h-media-card {
          margin-bottom: 45px;
        }
        .h-media-card img {
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
)

const More = ({category}) => {
  let medias = category.movies
  medias = medias.map(media => {
    media.img = `${STATIC_PATH}/hthumbs/1.png`
    return media
  })
  if (TENANT !== 'dalecampeon') {
    medias = [
      {
        img: `${STATIC_PATH}/hthumbs/1.png`,
        title: 'Héroes Anónimos: Juan Melgarejo',
        description: `Juan Melgarejo, ha pasado por varias etapas dentro de ${CONFIG.appName}. Partió en Operaciones, luego trabajó de junior, hasta que un día apoyó en la Utilería del Fútbol Joven y nunca más abandonó el costado de una cancha. Esta es su historia #94AñosColoColo`,
      },
      {
        img: `${STATIC_PATH}/hthumbs/2.png`,
        title: 'Banini, la mejor del año',
        description: `Estefanía Banini, la 10 de ${CONFIG.appName} Femenino, "la Messi" como le llaman, fue elegida como la mejor del Fútbol Femenino, en la premiación que realiza año a año el Círculo de Periodistas Deportivos.`,
      },
      {
        img: `${STATIC_PATH}/hthumbs/3.png`,
        title: '¿Qué tipo de entrenamiento es éste?',
        description: 'Nuestro Primer Equipo compartió y practicó junto a un club deportivo de no videntes.',
      }
    ]
  }
  return (
    <div className="more container-fluid">
      <div className="row">
        <div className="col offset-md-1">
          <h2 className="h2 text-uppercase">Más {category.name}</h2>
        </div>
      </div>
      <div className="cards">
        { medias.map((media, i) => (
          <HMediaCard key={i} {...{category, media}} />
        )) }
      </div>
      <style jsx>{`
        .more {
          background-color: var(--dark-gray3);
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
        @media (min-width: 768px) {
          .more {
            padding-top: 45px;
          }
          .h2 {
            font-size: 31px;
            margin-bottom: 60px;
          }
          .cards {
            padding-left: 4%;
          }
        }
      `}</style>
    </div>
  );
}

export default MediaPage1
