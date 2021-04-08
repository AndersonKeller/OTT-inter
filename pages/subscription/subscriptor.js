import Color from 'color'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import AppLogo from '~/components/LogoApp'
import ClubLogo from '~/components/LogoClub'
import Button from '~/components/button'
import H2 from '~/components/h2'
import Layout from '~/components/layout/Layout'
import Loading from '~/components/Loading/Loading'
import withApi from '~/components/withApi'
import { CONFIG } from '~/config'
import { STATIC_PATH, TENANT } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import UserContext from '~/contexts/UserContext'
import useWindowDimensions from '~/hooks/useWindowDimensions'
import api from '~/services/api'
import Router from "next/router";
import { Accordion, Card } from 'react-bootstrap'
import {StyleSection1, StyleSection2, PageStyle, StylePackages,StyleSection4} from './style'


function SubscriptorPage({ layoutProps, mainPackage }) {

  const playersName = TENANT === 'river' ? 'Franco Armani' :
    TENANT === 'colocolo' ? 'Valdivia' :
    TENANT === 'lau' ? 'Walter Damián Montillo' : 'Todos los jugadores están'

  const section2Alt = TENANT === 'river' ? `${playersName} con un trofeo` :
    TENANT === 'coloclo' ? `${playersName} chutando` :
    TENANT === 'lau' ? 'Walter Damián Montillo en la firma mostrando sua camisa número 10' : null

  const section2Text = CONFIG.lang === 'es-CL' ? 'Vélo donde y cuando quieras.' : 'Mira donde y cuando quieras.'

  const section3Text = TENANT === 'river' ? '¡Destacados del club y contenido exclusivo para ver tantas veces como quieras!' :
  TENANT === 'lau' ? 'Campeones 1994: rompiendo 25 años de maldición' : null

  return (
    <Layout {...layoutProps} header="closed">
      <PageStyle>
      <Head>
        <title>Subscriptor &lt; {CONFIG.appName}</title>
      </Head>
      <div className="subscriptor">

        {/* section 1 */}
        <Section1 mainPackage={mainPackage} />

          {/* section 2 */}
         <Section2></Section2>

         {/* Section 3 Packages */}
         {/* <Packages></Packages> */}


          {/* Questions */}
          <Section4></Section4>


      </div>
    </PageStyle>
    </Layout >
  );
}

SubscriptorPage.getInitialProps = async ({ api }) => {
  const mainPackage = await (async () => {
    try {
      const { data: config } = await api.get(`configs`)
      const { package: value } = config
      return value
    } catch (err) {
      return null
    }
  })()
  return { mainPackage }
}

export default withApi(SubscriptorPage)

/* Packages */
const Packages = () => {

  const { openAuthModal } = useContext(AuthModalContext)
  const { user } = useContext(UserContext)
  const [packages, setPackages] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  // fetch packages
  useEffect(_ => {
    async function fetchData() {
      setLoading(true)
      try {
        const { data } = await api().get('/packages')
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
    Router.push('/signup')
    // openAuthModal('register', packageId)
  }

  const probaGratis = CONFIG.lang === 'es-CL' ? 'Prueba gratis' : 'Probá Gratis'

  const theme = useContext(ThemeContext)
  const cardColor = theme.colors.backgroundContrast
  const cardHover = Color(theme.colors.backgroundContrast).darken(.15).hsl().string()

  return (
<StylePackages cardColor={cardColor} cardHover={cardHover} >
    <section className="prices text-center container-fluid">
      <div className="entries row">
        <div className="col-md-10 offset-md-1 col-xl-12 offset-xl-0">

          {/* loading */}
          <Loading loadingState={loading} />

          {/* prices */}
          {packages && (
            <div>
              {packages.length ? (
                <div className="cards">
                  <div className="row justify-content-center gutter-15">
                    {packages.map((item, key) => (
                      <div className="col-12 col-sm-6 col-lg-4 col-xl" {...{ key }}>
                        <div className={`card ${item.amount === 0 ? 'card--free' : ''}`}>
                          <div className="card-heading">Suscripción</div>
                          <div className="time">{item.name}</div>
                          {item.amount !== "$0" && (
                            <div className="value">
                              {item.price}
                            </div>
                          )}
                          {!user && (item.amount === "$0" ? (
                            <Button
                              block
                              onClick={(e) => choosePackage(e, item.id)}
                            >{probaGratis}</Button>
                          ) : (
                              <Button
                                block
                                color="secondary"
                                onClick={(e) => choosePackage(e, item.id)}
                                outline
                              >Suscribirme</Button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                  <p>No hay paquetes definidos.</p>
                )}
            </div>
          )}

          {/* error */}
          {error && (
            <p>No se pudieron obtener los paquetes.</p>
          )}

        </div>
      </div>
    </section>
    </StylePackages>
  )
}

const Section1 = ({ mainPackage }) => {

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
  const leadText = `¡El ${CONFIG.fullClubName} te da la bienvenida a la primera plataforma digital en su tipo de contenidos exclusivos del Romántico Viajero, ${TENANT === 'river' ? 'del Más Grande' : CONFIG.appName}!`
  const text_1_Section_1 = `¡ Bienvenido al  ${CONFIG.fullClubName}`
  const text_2_Section_1 = `Aquí tendrás acceso a ${CONFIG.fullClubName} como nunca imaginaste, estar presente en el futori del Club.`
  const text_3_Section_1 = `Se parte de la revolución escarlata`

  const minPrice = TENANT === 'lau' ? '$1.690' : mainPackage ? '$' + mainPackage.amount : null
  /*
  new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS',
    minimumFractionDigits: 0
  }).format(number)
   */

  const { clubName } = CONFIG
  const theme = useContext(ThemeContext)
  const { openAuthModal } = useContext(AuthModalContext)
  const backgroundColor = Color(theme.colors.background)
    const { user } = useContext(UserContext)
  function finish(){

        if(user) {
      Router.push({
          pathname: "/register/wizard/complete-test",

        })

    } else {
        openAuthModal('register')
    }

  }

  return (
    <StyleSection1 windowWidth={windowWidth} sectionHeight={sectionHeight} imageWidth={imageWidth}>
    <div className="section1 container-fluid">
      <div className="row container-inicial-sub">
        <div className="col-md-5">
          <div className="section1__content">

            <div className="row ">
            </div>
            <p>{text_1_Section_1}</p>
            <p  className="text-featured">{text_2_Section_1}</p>
            <p>{text_3_Section_1}</p>
            {user? (<Button onClick={finish} >finalizar registro</Button>):(
              <Button onClick={finish} >Registrarse</Button>
            )}
          </div>
        </div>
      </div>

    </div></StyleSection1>
  )
}



const Section2 = () => {

  const { clubName } = CONFIG
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background)
  const text_1_Section_2 =`Mira contenido totalmente exclusivo, comparte con el  Equipo los  momentos que siempre  quisiste ver o estar.`
  const text_2_Section_2 =`Mantente al tanto de todas las novedades que el club te traerá`
  const text_3_Section_2 =`La oportunidad de estar en esta nueva etapa es ahora..`

  return (
    <StyleSection2>
    <div className="section1 container-fluid">
      <div className="row ">
       <div className="section1__content">
         <div className="section-2">
         <div className="container-inicial-sub">
         <div className="col-md-5 efeito">
          <img className="" src={`${STATIC_PATH}/subscriptor/section3-img.png`}></img>
          </div>
            <div className="col-md-5 ">
              <p className="text-featured">{text_1_Section_2}</p>
              <p >{text_2_Section_2}</p>
              <p>{text_3_Section_2}</p>
            </div>
         </div>
          </div>
        </div>
      </div>

    </div>
    </StyleSection2>
  )
}

const Section4 = () => {
  const [faqs ,setFaqs] = useState(
    [
    {
      "id": "1",
      "question": "¿Qué es América Play?",
      "answer": "Será la nueva forma que tendrá el Club de relacionarse con sus hinchas, aportando contenidos únicos y oportunidades de momentos que solo estarán disponibles en esta plataforma."
    },
    {
      "id": "1",
      "question": "¿Qué contenido habrá en America Play?",
      "answer": "Innovaremos cada vez más y daremos exclusividad a los suscriptores de América Play en contenido que hasta entonces no teníamos oportunidad de compartir."
     },
        {
      "id": "1",
      "question": "¿Puedo cancelar la suscripción?",
      "answer": `
      <p>Sí, puedes cancelar tu suscripción en cualquier momento, pero ya no tendrás la oportunidad de obtener esta oferta otra vez.</p>
     <p>Esta es una forma de recompensar a quienes nos acompañan desde el principio en nuestra revolución escarlata.</p>
      `
     }
  ]
  );



  return (
    <StyleSection4>
    <div className="section1 container-fluid">
      <div className="title-faqs">
         <p >Preguntas Frecuentes</p>
      </div>
      <div className="section2">
        <div className="card-width">
           <Accordion>
            { faqs.map((item, key) => (

              <Card className="faqs-card" key={key}>
                <div className="header-button">
                <Accordion.Toggle as={Card.Header} className="faqs-header" eventKey={key}>
                  <div>
                  <h5 className="faqs-question">{ item.question }</h5>
                  </div>
                </Accordion.Toggle>
              </div>
                <Accordion.Collapse eventKey={key}>
                  <Card.Body>
                       <div
                      className="faqs-text"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </Card.Body>
                </Accordion.Collapse>

              </Card>
            )) }
          </Accordion>
      </div>

    </div>
    </div>
    </StyleSection4>
  )
}
