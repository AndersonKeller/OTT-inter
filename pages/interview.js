import Layout from '../components/layout'
import Button from '../components/button'
import Link from 'next/link'

export default function Entrevista() {
  const interviews = [
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
    <Layout>
      <div className="container-fluid">

        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <div className="player">
              <img src="/static/interview/sample.png" width="822" height="464" className="img-fluid" />
              <div className="block-msg text-center">
                <div className="text-block">
                  <p><strong>Este contenido es exclusivo para los suscriptores</strong></p>
                  <p className="d-none d-md-block"><small>Ver las novelas, series, humor, películas y dibujos cuando y donde quieras.</small></p>
                </div>
                <Button>Probá 7 días Gratis</Button>
                <div className="text-block">
                  <p><strong><span className="text-uppercase d-none d-md-inline">Pruebe 7 días gratis</span><br className="d-none d-md-inline" />
                    ¿Ya es suscriptor? <span className="text-uppercase">Haga <Link href="/login"><a>login</a></Link></span></strong></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="more">
              { interviews.map((interview) => (
                <Link href="/interview">
                  <a className="more-card">
                    <div className="row align-items-center gutter-15">
                      <div className="col-7">
                        <img src={interview.img} width="220" height="123" className="img-fluid" />
                      </div>
                      <div className="col-4">
                        <p><strong>{interview.title}</strong></p>
                      </div>
                    </div>
                  </a>
                </Link>
              )) }
            </div>
          </div>
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
        .more {
          font-size: 11px;
          line-height: 1.75;
        }
        .more-card {
          display: block;
          padding-top: 15px;
          padding-bottom: 15px;
          text-decoration: none;
        }
        @media (min-width: 768px) {
          .block-msg {
            font-size: 22px;
          }
          .text-block p + p {
            margin-top: 10px;
          }
        }
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
