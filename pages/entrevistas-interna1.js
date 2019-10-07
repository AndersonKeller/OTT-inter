import Head from 'next/head'
import Link from 'next/link'

import Button from '../components/button'
import Layout from '../components/layout/Layout'
import MiLista from '../components/mi-lista'
import { APP_NAME } from '../constants/constants'

const Cover = _ => (
  <div className="cover container-fluid">
    <div className="row align-items-center">
      <div className="col-12 col-md-5 offset-md-1">
        <h1>Mano a mano con Javier Pinola</h1>
        <div>2019</div>
        <div className="description">
          <p>El jugador del Más Grande habló de su carrera en una entrevista exclusiva con {APP_NAME}.</p>
        </div>
        <Link href="/subscriptor">
          <Button>Proba Gratis</Button>
        </Link>
        <MiLista />
      </div>
    </div>
    <style jsx>{`
      .cover {
        background-color: #0a0b11;
        background-image: url(/static/interviews/gradient.png),
                          url(/static/interviews/javier-pinola.png);
        background-position: 50% 50%, 97.5% 50%;
        background-repeat: no-repeat, no-repeat;
        background-size: cover, contain;
        font-size: 20px;
        line-height: 1.5;
        margin-bottom: 70px;
      }
      .cover .row {
        padding-top: calc(var(--padding-top) + 15px);
        padding-bottom: 15px;
      }
      h1 {
        font-size: 31px;
        line-height: normal;
        margin-bottom: 0;
      }
      .description {
        margin-bottom: 30px;
      }
      .cover :global(.btn-primary) {
        margin-bottom: 15px;
      }
      @media (min-width: 768px) {
        .cover .row {
          height: 560px;
          padding-top: 110px;
        }
        .description {
          margin-bottom: 50px;
        }
        .cover :global(.btn-primary) {
          margin-right: 15px;
          margin-bottom: 0;
        }
      }
    `}</style>
  </div>
)

const More = _ => {
  const interviews = [
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
    <div className="more container-fluid">
      <div className="row">
        <div className="col offset-md-1">
          <h2 className="h2 text-uppercase">Más Entrevistas</h2>
        </div>
      </div>
      <div className="cards">
        { interviews.map((interview) => (
          <div className="interview-card row align-items-center">
            <div className="col-md-4">
              <Link href="/interview">
                <a><img src={interview.img} width="390" height="220" className="img-fluid w-100 d-block" /></a>
              </Link>
            </div>
            <div className="col-md-7">
              <h3 className="h3">
                <Link href="/interview">
                  <a>{interview.title}</a>
                </Link>
              </h3>
              <p>{interview.text}</p>
            </div>
          </div>
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
        .interview-card {
          margin-bottom: 30px;
        }
        .interview-card a {
          color: var(--white);
          text-decoration: none;
        }
        .interview-card img {
          margin-bottom: 15px;
        }
        .h3 {
          font-size: inherit;
          margin-top: 0;
          margin-bottom: 0;
        }
        .h3 a:focus,
        .h3 a:hover {
          text-decoration: underline;
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
          .interview-card {
            margin-bottom: 45px;
          }
          .interview-card img {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function Entrevistas() {
  return (
    <Layout paddingTop={false}>
      <Head>
        <title>Entrevistas &lt; {APP_NAME}</title>
      </Head>
      <Cover />
      <More />
    </Layout>
  );
}
