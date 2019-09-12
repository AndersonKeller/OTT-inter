import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BlockedPlayer from '../components/blocked-player'
import Button from '../components/button'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout'
import MoreContentCarousel from '../components/more-content-carousel'
import VideoDescription from '../components/video-description'

export default function VideosPage() {
  const video = {
    title: 'Una noche en el Museo River. #117AñosDeHistoria',
    year: '2018',
    description: 'El Club Más Grande por su gente. El Club Más Grande por sus ídolos. El Club Más Grande por su gloria. ¡Feliz cumpleaños, River!',
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
        <title>Videos</title>
      </Head>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <BlockedPlayer image="/static/videos/player-image.png" />
          </div>
        </div>
        <VideoDescription video={video} />
        <div className="icons-row row">
          <div className="col">
            <LikeNCommentBtns />
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

function LikeNCommentBtns() {
  const [like, setLike] = useState(false);
  async function handleLike() {
    setLike( ! like);
  }
  return (
    <div>
      <button className={`like-btn ${like ? 'liked' : ''}`} onClick={(e) => handleLike(e)} type="button">
        <img src="/static/like-icon.svg" width="35" height="30" />
        <span>62</span>
      </button>
      <button className="comment-btn" type="button" onClick={_ => { document.location.hash = 'comments' }}>
        <img src="/static/comment-icon.svg" width="36" height="32" />
        <span>2</span>
      </button>
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          color: var(--mid-gray);
          cursor: pointer;
          font-size: 16px;
          outline: 0;
          padding: 5px 10px 5px 5px;
        }
        button:focus,
        button:hover {
          color: var(--white);
        }
        .liked {
          color: red !important;
        }
        img {
          margin-right: 5px;
          max-height: 20px;
          vertical-align: middle;
          width: auto;
        }
        @media (min-width: 768px) {
          button {
            font-size: 20px;
            padding: 10px;
          }
          img {
            margin-right: 10px;
            max-height: 32px;
          }
        }
      `}</style>
    </div>
  )
}

function SocialShareBtns() {
  return (
    <div>
      <button aria-label="Share at Instagram" className="instagram-btn" type="button">
        <img src="/static/instagram-icon.svg" width="42" height="42" />
      </button>
      <button aria-label="Share at Facebook" className="facebook-btn" type="button">
        <img src="/static/facebook-icon.svg" width="42" height="42" />
      </button>
      <button aria-label="Share at Twitter" className="twitter-btn" type="button">
        <img src="/static/twitter-icon.svg" width="42" height="42" />
      </button>
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          outline: 0;
          padding: 5px;
        }
        img {
          max-height: 25px;
          width: auto;
        }
        @media (min-width: 768px) {
          img {
            max-height: 42px;
          }
        }
      `}</style>
    </div>
  )
}
