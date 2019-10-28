import Head from 'next/head'
import Link from 'next/link'
import BlockedPlayer from '../components/blocked-player'
import CommentSection from '../components/comment-section'
import Layout from '../components/layout/Layout'
import LikeNCommentsBtns from '../components/like-n-comments-btns'
import MediaDescription from '../components/media-description'
import MoreContentCarousel from '../components/more-content-carousel'
import SocialShareBtns from '../components/social-share-btns'
import { CONFIG } from '../config'
import { STATIC_PATH, TENANT } from '../constants/constants'

export default function InterviewPage({ layoutProps }) {
  const media = {
    title: `Mano a mano con ${TENANT === 'dalecampeon' ? 'Javier Pinola' : 'Esteban Paredes'}`,
    year: '2019',
    description: TENANT === 'dalecampeon' ? `El jugador del Más Grande habló de su carrera en una entrevista exclusiva con ${CONFIG.appName}.` : `El capitán albo tuvo un mano a mano con Dale Cacique, donde contó sobre todo lo que rodea al delantero albo: El retiro, el torneo local, la copa sudamericana y Copa América.`,
  }
  const moreContent = [
    `${STATIC_PATH}/cards/interviews/8.png`,
    `${STATIC_PATH}/cards/interviews/9.png`,
    `${STATIC_PATH}/cards/interviews/10.png`,
    `${STATIC_PATH}/cards/interviews/11.png`,
    `${STATIC_PATH}/cards/interviews/12.png`,
    `${STATIC_PATH}/cards/interviews/13.png`,
    `${STATIC_PATH}/cards/interviews/14.png`,
  ]
  return (
    <Layout {...layoutProps}>
      <Head>
        <title>Entrevista &lt; {CONFIG.appName}</title>
      </Head>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <BlockedPlayer image={`${STATIC_PATH}/blurred-sample.png`} />
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
        title={CONFIG.supportersAKA}
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
  let interviews
  if (TENANT === 'dalecampeon') {
    interviews = [
      {
        img: `${STATIC_PATH}/hthumbs/1.png`,
        title: 'Entrevista a Javier Pinola',
        text: 'EXCLUSIVO #DaleCampeon | Hablamos mano a mano con Javier Pinola: "Estoy muy contento con este presente. Al principio me costó adaptarme"',
      },
      {
        img: `${STATIC_PATH}/hthumbs/2.png`,
        title: 'Mano a mano con Javier Pinola',
        text: `El jugador del Más Grande habló de su carrera en una entrevista exclusiva con ${CONFIG.appName}.`,
      },
      {
        img: `${STATIC_PATH}/hthumbs/3.png`,
        title: 'Pinola: "Queremos seguir ganando y sumando confianza"',
        text: 'La palabra de Javier Pinola luego del triunfo ante San Martín. ¡Escuchalo! ',
      }
    ]
  } else {
    interviews = [
      {
        img: `${STATIC_PATH}/hthumbs/1.png`,
        title: 'Héroes Anónimos: Juan Melgarejo',
        text: `Juan Melgarejo, ha pasado por varias etapas dentro de ${CONFIG.appName}. Partió en Operaciones, luego trabajó de junior, hasta que un día apoyó en la Utilería del Fútbol Joven y nunca más abandonó el costado de una cancha. Esta es su historia #94AñosColoColo`,
      },
      {
        img: `${STATIC_PATH}/hthumbs/2.png`,
        title: 'Banini, la mejor del año',
        text: `Estefanía Banini, la 10 de ${CONFIG.appName} Femenino, "la Messi" como le llaman, fue elegida como la mejor del Fútbol Femenino, en la premiación que realiza año a año el Círculo de Periodistas Deportivos.`,
      },
      {
        img: `${STATIC_PATH}/hthumbs/3.png`,
        title: '¿Qué tipo de entrenamiento es éste?',
        text: 'Nuestro Primer Equipo compartió y practicó junto a un club deportivo de no videntes.',
      }
    ]
  }
  return (
    <div>
      { interviews.map((interview, index) => (
        <MoreInterviewCard interview={interview} key={index} />
      )) }
    </div>
  )
}

function MoreInterviewCard(props) {
  return (
    <div className="more-card">
      <Link href="/media-inside-2-private">
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
