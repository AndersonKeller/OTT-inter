import Layout from '../components/layout/Layout'
import Head from 'next/head'
import H2 from '../components/h2'
import Button from '../components/button'
import { STATIC_PATH, TENANT } from '../constants/constants'
import { CONFIG } from '../config'
import { useContext, useEffect, useState } from 'react'
import { AuthModalContext } from '../contexts/AuthModalContext'
import UserContext from '../contexts/UserContext'
import Loading from '../components/Loading/Loading'
import api from '../services/api'
import useWindowDimensions from '../hooks/useWindowDimensions'
import AppLogo from '~/components/AppLogo'

export default function Subscriptor({ layoutProps }) {
  const playersName = TENANT === 'river' ? 'Franco Armani' : 'Valdivia'
  const section2Alt = TENANT === 'river' ? `${playersName} con un trofeo` : `${playersName} chutando`

  return (
    <Layout {...layoutProps} header="closed">
      <Head>
        <title>Subscriptor &lt; {CONFIG.appName}</title>
      </Head>
      <div className="subscriptor">

        {/* section 1 */}
        <Section1 />

        {/* section 2 */}
        <SubscriptorSection
          direction="right"
          gradientSrc="/static/subscriptor/section2-gradient.png"
          imgAlt={section2Alt}
          imgHeight="560"
          imgSrc={`${STATIC_PATH}/subscriptor/section2-img.png`}
          imgWidth="870"
        >
          <H2>
            <span>{playersName} en</span> <AppLogo height={23} verticalAlign={0} />
          </H2>
          <SubscriptorSectionText>
            <p>Mira donde y cuando quieras.</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

        {/* section 3 */}
        <SubscriptorSection
          direction="left"
          gradientSrc="/static/subscriptor/section3-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc={`${STATIC_PATH}/subscriptor/section3-img.png`}
          imgWidth="840"
        >
          <H2>
            El mejor contenido
          </H2>
          <SubscriptorSectionText>
            {TENANT === 'river' ? (
              <p>
              ¡Destacados del club y contenido exclusivo para ver tantas veces como quieras!</p>
            ) : (
              <p>Mati Zaldivia: mi vida en el Albo</p>
            )}
          </SubscriptorSectionText>
        </SubscriptorSection>

        {/* section 4 */}
        <SubscriptorSection
          direction="right"
          gradientSrc="/static/subscriptor/section4-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc={`${STATIC_PATH}/subscriptor/section4-img.png`}
          imgWidth="870"
        >
          <H2>
            <span>LLeva</span> <AppLogo height={23} verticalAlign={0} />
          </H2>
          <SubscriptorSectionText>
            <p>Mira lo mejor en contenidos, documentales, series y el día a día de tu club.</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

        {/* section 5 */}
        <SubscriptorSection
          direction="left"
          gradientSrc="/static/subscriptor/section5-gradient.png"
          imgAlt=""
          imgHeight="560"
          imgSrc={`${STATIC_PATH}/subscriptor/section5-img.png`}
          imgWidth="870"
        >
          <H2>
            Sin compromiso
          </H2>
          <SubscriptorSectionText>
            <p>¿No quieres continuar? Cancelas cuando quieras en línea y con un Click</p>
          </SubscriptorSectionText>
        </SubscriptorSection>

        <Packages />

      </div>
      <style jsx>{`
        .subscriptor {
          line-height: 1.5;
        }
      `}</style>
    </Layout>
  );
}

const SubscriptorSectionText = ({ children }) => {
  return (
    <div className="subscriptor-section-text">
      {children}
      <style jsx>{`
        .subscriptor-section-text :global(p:only-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  )
}

const Packages = () => {

  const { openAuthModal } = useContext(AuthModalContext)
  const { user } = useContext(UserContext)
  const [ packages, setPackages ] = useState()
  const [ error, setError ] = useState()
  const [ loading, setLoading ] = useState(false)

  // fetch packages
  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const {data} = await api().get('/packages')
        setPackages(data)
      } catch (error) {
        setError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  // choose package / register
  function choosePackage(e, packageId) {
    e.preventDefault()
    openAuthModal('register', packageId)
  }

  return (
    <section className="prices text-center container-fluid">
      <div className="entries row">
        <div className="col-md-10 offset-md-1 col-xl-12 offset-xl-0">

          {/* loading */}
          <Loading loadingState={loading} />

          {/* prices */}
          { packages && (
            <div>
              { packages.length ? (
                <div className="cards">
                  <div className="row justify-content-center gutter-15">
                    { packages.map((item, key) => (
                      <div className="col-12 col-sm-6 col-lg-4 col-xl" {...{key}}>
                        <div className={`card ${item.amount === 0 ? 'card--free' : ''}`}>
                          <div className="card-heading">Suscripción</div>
                          <div className="time">{item.name}</div>
                          { item.amount !== 0 && (
                            <div className="value">
                              { item.price }
                            </div>
                          ) }
                          { ! user && (item.amount === 0 ? (
                            <Button
                              block
                              onClick={(e) => choosePackage(e, item.id)}
                            >Probá Gratis</Button>
                          ) : (
                            <Button
                              block
                              color="secondary"
                              onClick={(e) => choosePackage(e, item.id)}
                              outline
                            >Suscribir</Button>
                          )) }
                        </div>
                      </div>
                    )) }
                  </div>
                </div>
              ) : (
                <p>No hay paquetes definidos.</p>
              ) }
            </div>
          ) }

          {/* error */}
          { error && (
            <p>No se pudieron obtener los paquetes.</p>
          ) }

        </div>
      </div>
      <style jsx>{`
        .prices {
          border-top: 1px solid #fff;
          padding-top: 15px;
        }
        @media (min-width: 768px) {
          .prices {
            padding-bottom: 95px;
          }
        }
        .cards {
          font-size: 31px;
          font-weight: bold;
          line-height: normal;
        }
        .card {
          background-color: #282828;
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          min-height: calc(100% - 15px);
          padding: 20px;
          transition: background-color 1s;
        }
        .card:hover {
          background-color: #1e1e1e;
          transition: background-color .1s;
        }
        .time,
        .value {
          margin-top: 15px;
        }
        .card :global(.btn) {
          margin-top: 30px;
        }
        @media (min-width: 768px) {
          .prices {
            border-top: 0;
          }
          .cards {
            padding-right: 15px;
            padding-left: 15px;
          }
          .time,
          .value {
            margin-top: 30px;
          }
          .value {
            margin-bottom: 45px;
          }
          .card :global(.btn) {
            margin-top: auto;
          }
          .card--free {
            padding-top: 87px;
          }
          .card--free .time {
            margin-bottom: 45px;
          }
        }
        @media (min-width: 1200px) {
          .card {
            padding-right: 30px;
            padding-left: 30px;
          }
        }
      `}</style>
    </section>
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
            height: 300px;
          }
          .subscriptor-section-text-col {
            padding-top: 0;
          }
          .subscriptor-section-text-col :global(.btn) {
            margin-right: 15px;
          }
        }
        @media (min-width: 992px) {
          .subscriptor-section .row {
            height: 530px;
          }
          .subscriptor-section--right .subscriptor-section-text-col {
            padding-left: 3.5%;
          }
          .subscriptor-section--left .subscriptor-section-text-col {
            padding-right: 4%;
          }
        }
        @media (min-width: 1400px) {
          .subscriptor-section .row {
            height: 560px;
          }
          .subscriptor-section-text-col :global(.btn) {
            margin-right: 35px;
          }
        }
      `}</style>
    </div>
  )
}

const Section1 = () => {

  const iPhone4Height = 480

  const {
    height: windowHeight = iPhone4Height,
    width: windowWidth = 320,
  } = useWindowDimensions()

  const imageDimensions = { width: 1310, height: 746 }

  const headerHeight = windowWidth >= 768 ? 90 : 75

  const footerHeight = windowWidth >= 768 ? 0 : 65

  const chromeLaptopHeight = 657

  const minHeight = windowWidth >= 1400 ? 0 :
    windowWidth >= 1200 ? chromeLaptopHeight - headerHeight :
    iPhone4Height - headerHeight - footerHeight

  const maxHeight = windowWidth >= 1400 ? 740 :
    windowWidth >= 1200 ? windowHeight :
    windowWidth >= 992 ? 525 :
    windowWidth >= 768 ? 450 :
    windowHeight

  const sectionHeight = Math.max(minHeight,
    Math.min(maxHeight,
      windowHeight - headerHeight - footerHeight,
    ),
  )

  const percentage = sectionHeight / imageDimensions.height

  const imageWidth = percentage * imageDimensions.width

  const leadText = `¡${CONFIG.fullClubName} te da la bienvenida a la plataforma de contenidos ${TENANT === 'river' ? 'del Más Grande' : CONFIG.appName}!`

  return (
    <div className="section1 container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-1">
          <div className="section1__content">
            <div className="row">
              <div className="col-4 col-md-6">
                <img className="section1__logo img-fluid" src={`${STATIC_PATH}/logos/club.svg`} width="170" height="212" alt={`${CONFIG.clubName} Logo`} />
              </div>
            </div>
            <H2 className="text-uppercase section1__title">¡Bienvenidos!</H2>
            <p>{leadText}</p>
            <p>Todo por <big>{TENANT === 'river' ? 149 : 1699}</big> pesos mensuales.</p>
          </div>
        </div>
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
        .section1 {
          align-items: center;
          display: flex;
          font-size: 16px;
          height: ${sectionHeight + 'px'};
          line-height: 1.33;
          margin-bottom: 15px;
          overflow: hidden;
          padding-top: 30px;
          padding-bottom: 30px;
          position: relative;
          z-index: 1;
        }
        .section1::before {
          animation: sliding 200s linear infinite normal;
          background-image: url(${STATIC_PATH}/subscriptor/featured-background.png);
          background-position: 50% 0;
          background-size: ${imageWidth + 'px'} 100%;
          content: '';
          display: block;
          height: 100%;
          left: 0;
          position: absolute;
          top: 0;
          width: ${imageWidth * 10 + 'px'};
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
          margin-bottom: 15px;
          margin-left: 35px;
        }
        .section1__content :global(.section1__title) {
          margin-bottom: 10px;
        }
        .section1__content p {
          margin-bottom: 15px;
        }
        .section1__content big {
          font-size: 1.75em;
        }
        @media (min-width: 768px) {
          .section1 {
            padding-top: 30px;
            padding-bottom: 30px;
          }
        }
        @media (min-width: 1200px) {
          .section1 {
            --headerHeight: 90px;
            min-height: calc(100vh - var(--headerHeight));
          }
        }
        @media (min-width: 1400px) {
          .section1 {
            min-height: 0;
          }
          .section1__logo {
            margin-bottom: 45px;
          }
        }
      `}</style>
    </div>
  )
}
