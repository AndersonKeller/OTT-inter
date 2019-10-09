import Head from 'next/head'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout/Layout'
import LikeNCommentsBtns from '../components/like-n-comments-btns'
import MediaDescription from '../components/media-description'
import MoreContentCarousel from '../components/more-content-carousel'
import SocialShareBtns from '../components/social-share-btns'
import { CONFIG } from '../config'

export default function PodcastsPage() {
  const media = {
    title: `¡${CONFIG.clubName} celebra su cuarta Copa Libertadores!`,
    year: 'PODCAST # 10 - 2018',
    description: 'El papel de los jugadores y más en nuestro análisis de la gran final.',
  }
  const moreContent = [
    '/static/cards/podcasts/1.jpg',
    '/static/cards/podcasts/2.jpg',
    '/static/cards/podcasts/3.jpg',
    '/static/cards/podcasts/4.jpg',
    '/static/cards/podcasts/5.jpg',
    '/static/cards/podcasts/6.jpg',
    '/static/cards/podcasts/7.jpg',
  ]
  return (
    <Layout>
      <Head>
        <title>Podcasts &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 offset-2">
            <BlockedPlayer image="/static/podcasts/sample-player.png" />
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
