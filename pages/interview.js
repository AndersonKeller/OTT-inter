import Head from 'next/head'
import Link from 'next/link'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout/Layout'
import LikeNCommentsBtns from '../components/like-n-comments-btns'
import MediaDescription from '../components/media-description'
import MoreContentCarousel from '../components/more-content-carousel'
import SocialShareBtns from '../components/social-share-btns'
import { APP_NAME } from '../constants/constants'

export default function InterviewPage() {
  const media = {
    title: 'Mano a mano con Javier Pinola',
    year: '2019',
    description: `El jugador del Más Grande habló de su carrera en una entrevista exclusiva con ${APP_NAME}.`,
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
        <title>Entrevista &lt; {APP_NAME}</title>
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
        <MediaDescription media={media} />
        <div className="icons-row row">
          <div className="col">
            <LikeNCommentsBtns />
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
        title="Platences"
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
      text: `El jugador del Más Grande habló de su carrera en una entrevista exclusiva con ${APP_NAME}.`,
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
