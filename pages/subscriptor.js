import Layout from '../components/layout'
import Head from 'next/head'
import H2 from '../components/h2'
import Button from '../components/button'

const SubscriptorSectionText = (props) => {
  return (
    <div className="subscriptor-section-text">
      {props.children}
      <style jsx>{`
        .subscriptor-section-text :global(p:only-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

const SubscriptorSection = (props) => {
  const direction = props.direction || 'right'
  return (
    <div className={`subscriptor-section subscriptor-section--${direction} container-fluid text-${direction}`}>
      <div className="row align-items-center">
        <div className="subscriptor-section-img-col col-12 d-md-none">
          <img 
            alt={props.imgAlt} 
            className="img-fluid w-100 d-block"
            height={props.imgHeight}
            src={props.imgSrc} 
            width={props.imgWidth} 
          />
        </div>
        <div className={`subscriptor-section-text-col col-md-4 offset-md-${direction === 'left' ? '1' : '7'}`}>
          {props.children}
        </div>
      </div>
      <style jsx>{`
        .subscriptor-section {
          margin-bottom: 30px;
        }
        .subscriptor-section-img-col {
          padding-right: 0;
          padding-left: 0;
          position: relative;
        }
        .subscriptor-section-img-col::after {
          background-image: url(${props.gradientSrc});
          background-size: cover;
          bottom: 0;
          content: '';
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
        }
        .subscriptor-section--left .subscriptor-section-img-col::after {
          background-position: 100% 50%;
        }
        .subscriptor-section--right .subscriptor-section-img-col::after {
          background-position: 0 50%;
        }
        .subscriptor-section-text-col {
          padding-top: 15px;
        }
        .subscriptor-section-text-col :global(.h2) {
          margin-bottom: 15px;
        }
        .subscriptor-section-text-col :global(.btn) {
          margin-top: 30px;
        }
        @media (min-width: 768px) {
          .subscriptor-section {
            margin-bottom: 0;
          }
          .subscriptor-section .row {
            background-image: url(${props.gradientSrc}),
                              url(${props.imgSrc});
            background-position: ${direction === 'left' ? '50% 50%, 100% 50%' : '50% 50%, 0 50%'};
            background-repeat: no-repeat, no-repeat;
            background-size: cover, contain;
            height: 530px;
          }
          .subscriptor-section--left .subscriptor-section-img-col {
            order: 12;
          }
          .subscriptor-section-text-col {
            padding-top: 0;
          }
          .subscriptor-section--right .subscriptor-section-text-col {
            padding-left: 7.5%;
          }
          .subscriptor-section-text-col :global(.btn) {
            margin-right: 15px;
          }
        }
        @media (min-width: 1400px) {
          .subscriptor-section .row {
            height: 560px;
          }
          .subscriptor-section-text-col :global(.btn) {
            /* margin-top: 35px; */
            margin-right: 35px;
          }
        }
      `}</style>
    </div>
  )
}

export default function Subscriptor() {
  return (
    <Layout header="closed">
      <Head>
        <title>Subscriptor</title>
      </Head>
      <div className="subscriptor">

        {/* section 1 */}
        <div className="section1 container-fluid">
          <div className="row">
            <div className="col-4 offset-1">
              <div className="section1__content">
                <img className="section1__logo img-fluid" src="/static/river-logo.svg" width="170" height="212" alt="River Logo" />
                <H2 className="text-uppercase section1__title">¡Bienvenidos!</H2>
                <p className="text-uppercase">Club Atlético River Plate te da la bienvenida a la plataforma de contenidos del más grande</p>
                <p>Todo por $ 199 pesos mensuales.</p>
              </div>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <SubscriptorSection
          direction="right"
          gradientSrc="/static/subscriptor/section2-gradient.png"
          imgAlt="Franco Armani con un trofeo"
          imgHeight="560"
          imgSrc="/static/subscriptor/section2-img.png"
          imgWidth="870"
        >
          <H2>
            Franco Armani en <span className="text-uppercase">Dale Campeón</span>!
          </H2>
          <SubscriptorSectionText>
            <p>Vea dónde y cuando quiera, incluso 24 horas antes de pasar a la TV</p>
          </SubscriptorSectionText>
          <Button>Probá 7 días Gratis</Button>
        </SubscriptorSection>

        {/* section 3 */}
        <SubscriptorSection
          direction="left"
          gradientSrc="/static/subscriptor/section3-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc="/static/subscriptor/section3-img.png"
          imgWidth="840"
        >
          <H2>
            El mejor contenido
          </H2>
          <SubscriptorSectionText>
            <p>Sucesos como The Handmaid's Tale y clásicos, como Dexter y House</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

        {/* section 4 */}
        <SubscriptorSection
          direction="right"
          gradientSrc="/static/subscriptor/section4-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc="/static/subscriptor/section4-img.png"
          imgWidth="870"
        >
          <H2>
            Lleve Dále Campeón
          </H2>
          <SubscriptorSectionText>
            <p>Descarga tu contenido favorita y mira sin conexión, sin gastar internet</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

        {/* section 5 */}
        <SubscriptorSection
          direction="left"
          gradientSrc="/static/subscriptor/section5-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc="/static/subscriptor/section5-img.png"
          imgWidth="870"
        >
          <H2>
            Sin compromiso
          </H2>
          <SubscriptorSectionText>
            <p>¿No quiero mas? Usted cancela cuando quiera: en línea y con un clic</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

      </div>
      <style jsx>{`
        @keyframes sliding {
          0% {
            transform: translateX(0)
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .subscriptor {
          line-height: 1.5;
        }
        .section1 {
          display: flex;
          height: 740px;
          line-height: 1.5;
          margin-bottom: 15px;
          overflow: hidden;
          padding-top: 95px;
          position: relative;
          z-index: 1;
        }
        .section1::before {
          animation: sliding 200s linear infinite normal;
          background-image: url(/static/subscriptor/featured-background.png);
          background-position: 50% 0;
          background-size: 1310px 100%;
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: 13100px;
          z-index: -2;
        }
        .section1::after {
          background-image: url(/static/subscriptor/featured-gradient.png);
          background-position: 50% 0;
          background-size: cover;
          bottom: 0;
          content: '';
          display: block;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: -1;
        }
        .section1 > .row {
          width: calc(100% + 30px)
        }
        .section1__logo {
          margin-bottom: 45px;
          margin-left: 35px;
        }
        .section1__content :global(.section1__title) {
          margin-bottom: 10px;
        }
        .section1__content p {
          margin-bottom: 5px;
        }
      `}</style>
    </Layout>
  );
}
