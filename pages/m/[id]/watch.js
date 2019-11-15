// import { useContext } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// app imports
import BlockedPlayer from '../../../components/blocked-player'
import CommentSection from '../../../components/comment-section'
import Layout from '../../../components/layout/Layout'
import LikeNCommentsBtns from '../../../components/like-n-comments-btns'
import MediaDescription from '../../../components/media-description'
import MoreContentCarousel from '../../../components/more-content-carousel'
import SocialShareBtns from '../../../components/social-share-btns'
// import UserContext from '../../../components/UserContext'
import { CONFIG } from '../../../config'
import { STATIC_PATH, TENANT } from '../../../constants/constants'
import { api } from '../../../services/api'

export default function WatchPage({ errorCode, category, media, related, layoutProps }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
  if (TENANT === 'dalecacique') {
    media = {
      title: `Mano a mano con Esteban Paredes`,
      publish_year: '2019',
      detail: `El capitán albo tuvo un mano a mano con Dale Cacique, donde contó sobre todo lo que rodea al delantero albo: El retiro, el torneo local, la copa sudamericana y Copa América.`,
    }
  }
  return (
    <Layout {...layoutProps}>
      <Head>
        <title>{media.title} &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <BlockedPlayer image={`${STATIC_PATH}/blurred-sample.png`} />
          </div>
          <div className="col-12 col-lg-4 d-none d-md-block">
            <Related {...{category, medias: related}} />
          </div>
        </div>
        <MediaDescription {...{media}} />
        <div className="icons-row row">
          <div className="col">
            <LikeNCommentsBtns />
          </div>
          <div className="col text-right">
            <SocialShareBtns />
          </div>
        </div>
        <div className="d-md-none">
          <Related {...{category, medias: related}} />
        </div>
      </div>
      <MoreContentCarousel {...{category}} />
      <CommentSection />
      <style jsx>{`
        .row:first-child {
          margin-bottom: 15px;
        }
        .icons-row {
          margin-bottom: 25px;
        }
        @media (min-width: 1200px) {
          .container-fluid {
            padding-right: 4%;
            padding-left: 4%;
          }
          .row:first-child {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </Layout>
  );
}

WatchPage.getInitialProps = async (context) => {
  const {id, category: slug} = context.query;
  try {
    const response = await api.get(`/movie/${id}/category/${slug}`)
    const { category, movie, related } = response.data
    return { category, media: movie, related }
  } catch (error) {
    const errorCode = 404
    return { errorCode }
  }
}

function Related({category, medias}) {
  return (
    <div>
      { medias.map((media, key) => (
        <RelatedVideo {...{category, media, key}} />
      )) }
    </div>
  )
}

function RelatedVideo({category = null, media: {id, thumbnail2_url, title}}) {
  return (
    <div className="more-card">
      <Link
        as={`/m/${id}/watch`}
        href={{
          pathname: '/m/[id]/watch',
          query: {
            category: (category ? category.slug : null),
            id: id,
          },
        }}
      >
        <a>
          <div className="row align-items-center gutter-15">
            <div className="col-7">
              <img
                className="img-fluid"
                height="123"
                src={thumbnail2_url ? thumbnail2_url : 'http://placehold.jp/220x123.png'} width="220"
              />
            </div>
            <div className="col-4">
              <p><strong>{title}</strong></p>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .more-card {
          font-size: 11px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        .more-card a {
          display: block;
          text-decoration: none;
        }
        .more-card a:focus,
        .more-card a:hover {
          color: var(--white);
        }
        .more-card p {
          margin-bottom: 0;
        }
        @media (min-width: 768px) {
          .more-card {
            line-height: 1.75;
            margin-bottom: 0;
            padding-top: 15px;
            padding-bottom: 15px;
          }
        }
      `}</style>
    </div>
  )
}
