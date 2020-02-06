import Head from 'next/head'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout/Layout'
// import LikeNCommentsBtns from '../components/like-n-comments-btns'
import MediaDescription from '../components/media-description'
import MoreContentCarousel from '../components/more-content-carousel'
// import SocialShareBtns from '../components/social-share-btns'
import { CONFIG } from '../config'
import { STATIC_PATH, TENANT } from '../constants/constants'

export default function PodcastsPage({ layoutProps }) {
  let media
  if (TENANT === 'river') {
    media = {
      title: `¡${CONFIG.clubName} celebra su cuarta Copa Libertadores!`,
      year: 'PODCAST # 10 - 2018',
      description: 'El papel de los jugadores y más en nuestro análisis de la gran final.',
    }
  } else {
    media = {
      title: `Revive el triunfo del Cacique ante Ñublense, al estilo #DaleCacique`,
      year: 'PODCAST # 25 - 2016',
      description: 'Escucha el relato de Danilo Quinteros para el triunfo de Colo Colo 2-1 ante Ñublense, por los 16os de final de Copa Chile.',
    }
  }
  const moreContent = [
    `${STATIC_PATH}/cards/podcasts/1.png`,
    `${STATIC_PATH}/cards/podcasts/2.png`,
    `${STATIC_PATH}/cards/podcasts/3.png`,
    `${STATIC_PATH}/cards/podcasts/4.png`,
    `${STATIC_PATH}/cards/podcasts/5.png`,
    `${STATIC_PATH}/cards/podcasts/6.png`,
    `${STATIC_PATH}/cards/podcasts/7.png`,
  ]
  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Podcasts &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            <BlockedPlayer image={`${STATIC_PATH}/sample-player.png`} />
          </div>
        </div>
        <MediaDescription media={media} />
        {/* <div className="icons-row row">
          <div className="col">
            <LikeNCommentsBtns />
          </div>
          <div className="col text-right">
            <SocialShareBtns />
          </div>
        </div> */}
      </div>
      <MoreContentCarousel
        content={moreContent}
        title="Recomendados"
        uppercase={false}
        variant="podcasts"
      />
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
