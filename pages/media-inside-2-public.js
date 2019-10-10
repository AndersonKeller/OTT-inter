import Head from 'next/head'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout/Layout'
import LikeNCommentsBtns from '../components/like-n-comments-btns'
import MediaDescription from '../components/media-description'
import MoreContentCarousel from '../components/more-content-carousel'
import SocialShareBtns from '../components/social-share-btns'
import { CONFIG } from '../config'
import { TENANT } from '../constants/constants'

export default _ => {
  let media
  if (TENANT === 'dalecampeon') {
    media = {
      title: `Una noche en el Museo ${CONFIG.shortClubName}. #117AñosDeHistoria`,
      year: '2018',
      description: `El Club Más Grande por su gente. El Club Más Grande por sus ídolos. El Club Más Grande por su gloria. ¡Feliz cumpleaños, ${CONFIG.shortClubName}!`,
    }
  } else {
    media = {
      title: `La Ruca te está llamando`,
      year: '2018',
      description: `Cuando ella llama no hay nada más importante.`,
    }
  }
  const moreContent = [
    '/static/videos/more/1.png',
    '/static/videos/more/2.png',
    '/static/videos/more/3.png',
    '/static/videos/more/4.png',
    '/static/videos/more/5.png',
    '/static/videos/more/6.png',
    '/static/videos/more/7.png',
  ]
  return (
    <Layout>
      <Head>
        <title>Videos &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <BlockedPlayer image="/static/videos/player-image.png" />
          </div>
        </div>
        <MediaDescription media={media} />
        <div className="icons-row row">
          <div className="col">
            <LikeNCommentsBtns />
          </div>
          <div className="col text-right">
            <SocialShareBtns />
          </div>
        </div>
      </div>
      <MoreContentCarousel
        content={moreContent}
        title="Recomendados"
        uppercase={false}
        variant="videos"
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
