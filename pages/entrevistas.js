import Layout from '../components/layout'
import Button from '../components/button'

const Cover = () => {
  return (
    <div className="cover container-fluid">
      <div className="row align-items-center">
        <div className="col-12 col-md-5 offset-md-1">
          <h1>Mano a mano con Javier Pinola</h1>
          <div>2019</div>
          <div className="description">
            <p>El jugador del Más Grande habló de su carrera en una entrevista exclusiva con Dale Campeón.</p>
          </div>
          <Button>Proba Gratis</Button>
          <Button color="secondary">
            <img src="/static/add-icon.svg" width="13" height="13" />
            <span>Mi Lista</span>
          </Button>
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
          padding-top: calc(110px + 15px);
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
          }
        }
      `}</style>
    </div>
  );
}

export default function Entrevistas() {
  return (
    <Layout>
      <Cover />
    </Layout>
  );
}
