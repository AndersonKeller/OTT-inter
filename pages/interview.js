import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout'
import MoreContentCarousel from '../components/more-content-carousel'
import VideoDescription from '../components/video-description'

export default function InterviewPage() {
  const video = {
    title: 'Mano a mano con Javier Pinola',
    year: '2019',
    description: 'El jugador del Más Grande habló de su carrera en una entrevista exclusiva con Dale Campeón.',
  }
  const moreContent = [
    '/static/interview/more/1.png',
    '/static/interview/more/2.png',
    '/static/interview/more/3.png',
    '/static/interview/more/4.png',
    '/static/interview/more/5.png',
    '/static/interview/more/6.png',
    '/static/interview/more/7.png',
  ]
  return (
    <Layout>
      <Head>
        <title>Entrevista</title>
      </Head>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <BlockedPlayer image="/static/interview/sample.png" />
          </div>
          <div className="col-12 col-lg-4 d-none d-md-block">
            <MoreInterviewCards />
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
        <div className="d-md-none">
          <MoreInterviewCards />
        </div>
      </div>
      <MoreContentCarousel
        content={moreContent}
        title="Platenences"
        variant="interview"
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

function MoreInterviewCards() {
  const moreInterviews = [
    {
      img: '/static/interviews/thumb1.png', 
      title: 'Entrevista a Javier Pinola', 
      text: 'EXCLUSIVO #DaleCampeon | Hablamos mano a mano con Javier Pinola: "Estoy muy contento con este presente. Al principio me costó adaptarme"', 
    },
    {
      img: '/static/interviews/thumb2.png', 
      title: 'Mano a mano con Javier Pinola', 
      text: 'El jugador del Más Grande habló de su carrera en una entrevista exclusiva con Dale Campeón.', 
    },
    {
      img: '/static/interviews/thumb3.png', 
      title: 'Pinola: "Queremos seguir ganando y sumando confianza"', 
      text: 'La palabra de Javier Pinola luego del triunfo ante San Martín. ¡Escuchalo! ', 
    }
  ]
  return (
    <div>
      { moreInterviews.map((interview, index) => (
        <MoreInterviewCard interview={interview} key={index} />
      )) }
    </div>
  )
}

function MoreInterviewCard(props) {
  return (
    <div className="more-card">
      <Link href="/interview">
        <a>
          <div className="row align-items-center gutter-15">
            <div className="col-7">
              <img src={props.interview.img} width="220" height="123" className="img-fluid" />
            </div>
            <div className="col-4">
              <p><strong>{props.interview.title}</strong></p>
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
