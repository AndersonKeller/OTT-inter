import Layout from '../components/layout'
import Button from '../components/button'
import Link from 'next/link'
import Head from 'next/head'

export default function InterviewPage() {
  return (
    <Layout>
      <Head>
        <title>Entrevista</title>
      </Head>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <Player />
          </div>
          <div className="col-12 col-lg-4">
            <MoreInterviewCards />
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1200px) {
          .container-fluid {
            padding-right: 4%;
            padding-left: 4%;
          }
        }
      `}</style>
    </Layout>
  );
}

function Player() {
  return (
    <div className="player">
      <img src="/static/interview/sample.png" width="822" height="464" className="img-fluid" />
      <div className="block-msg text-center">
        <div className="text-block">
          <p><strong>Este contenido es exclusivo para los suscriptores</strong></p>
          <p className="d-none d-md-block"><small>Ver las novelas, series, humor, películas y dibujos cuando y donde quieras.</small></p>
        </div>
        <Link href="/subscriptor">
          <Button>Probá 7 días Gratis</Button>
        </Link>
        <div className="text-block">
          <p><strong><span className="text-uppercase d-none d-md-inline">Pruebe 7 días gratis</span><br className="d-none d-md-inline" />
            ¿Ya es suscriptor? <span className="text-uppercase">Haga <Link href="/login"><a>login</a></Link></span></strong></p>
        </div>
      </div>
      <style jsx>{`
        .player {
          margin-bottom: 15px;
          overflow: hidden;
          position: relative;
        }
        .block-msg {
          align-items: center;
          background-color: rgba(0, 0, 0, .7);
          bottom: 0;
          flex-direction: column;
          font-size: 14px;
          justify-content: space-around;
          content: '';
          display: flex;
          height: 100%;
          left: 0;
          overflow: auto;
          padding: 7.5%;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
          width: 100%;
        }
        .text-block p {
          margin-bottom: 0;
        }
        .text-block small {
          font-size: .9em;
        }
        .text-block a {
          text-decoration: none;
        }
        .text-block a:focus,
        .text-block a:hover {
          text-decoration: underline;
        }
        @media (min-width: 768px) {
          .player {
            margin-bottom: 0;
          }
          .block-msg {
            font-size: 22px;
          }
          .text-block p + p {
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  )
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
      { moreInterviews.map((interview) => (
        <MoreInterviewCard interview={interview} />
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
