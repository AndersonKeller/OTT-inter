import Layout from '../components/layout'
import Button from '../components/button'
import Link from 'next/link'

export default function Entrevista() {
  return (
    <Layout>
      <div className="container-fluid">

        <div className="row">
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
          <div className="col-4">
            <div className="row">
              <div className="col-7">
                <img src="/static/interview/sample.png" width="822" height="464" className="img-fluid" />
              </div>
              <div className="col-5">
                Teste
              </div>
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
          left: 0;
          padding: 7.5%;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
        }
        .text-block p {
          margin-bottom: 0;
        }
        .text-block small {
          font-size: .9em;
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
