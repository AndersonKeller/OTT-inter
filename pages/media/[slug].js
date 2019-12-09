// next imports
import Head from 'next/head'

// react imports
import { useContext } from 'react'

// app imports
import Button from '../../components/button'
import Layout from '../../components/layout/Layout'
import MediaLink from '../../components/MediaLink/MediaLink'
import WishlistBtn from '../../components/wishlist-btn'
import UserContext from '../../components/UserContext'
import { CONFIG } from '../../config'
import api from '../../services/api'

// page
function MediaPage1({ category, errorCode, layoutProps, media, related }) {
  return (
    <Layout errorCode={errorCode} {...layoutProps} paddingTop={false}>
      <Head>
        <title>{media.title} &lt; {CONFIG.appName}</title>
      </Head>
      <Cover {...{category, media}} />
      <More {...{category, related}} />
    </Layout>
  );
}

// initial props
MediaPage1.getInitialProps = async (context) => {
  const { slug, category: categorySlug } = context.query;
  try {
    const response = await api.get(`/movie/${slug}` + (categorySlug ? `/category/${categorySlug}` : ''))
    const { category, movie, related } = response.data
    return { category, media: movie, related }
  } catch (error) {
    const errorCode = 404
    return { errorCode }
  }
}

// cover
const Cover = ({category, media}) => {
  const { user } = useContext(UserContext)
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
            <div className="heading">
              <h1>{media.title}</h1>
              {media.publish_year && (
                <div className="year">{media.publish_year}</div>
              )}
            </div>
            {media.detail && (
              <div className="description">
                <p>{media.detail}</p>
              </div>
            )}
          </div>
          <MediaLink {...{category, media}} watch>
            <Button>{!user ? 'Proba Gratis' : 'Mira'}</Button>
          </MediaLink>
          <WishlistBtn movieId={media.id} />
        </div>
      </div>
      <style jsx>{`
        .cover {
          background-color: #0a0b11;
          background-position: 50% 50%, 100% 50%;
          background-repeat: no-repeat, no-repeat;
          background-size: cover, cover;
          font-size: 15px;
          line-height: 1.5;
        }
        .cover .row {
          padding-top: calc(var(--padding-top) + 15px);
          padding-bottom: 15px;
        }
        .info {
          margin-bottom: 30px;
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
        .cover :global(.btn-primary) {
          margin-bottom: 15px;
        }
        @media (min-width: 768px) {
          .cover .row {
            height: 560px;
            padding-top: var(--padding-top);
            padding-bottom: 30px;
          }
          .cover :global(.btn-primary) {
            margin-right: 15px;
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  )
}

// individual more card
const HMediaCard = ({category, media}) => (
  <div className="h-media-card row">
    <div className="col-md-4">
      <MediaLink watch {...{category, media}}>
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
        <MediaLink watch {...{category, media}}>
          <a>{media.title}</a>
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
    `}</style>
  </div>
)

// more cards
const More = ({category, related}) => {
  let medias = related
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

// export
export default MediaPage1
