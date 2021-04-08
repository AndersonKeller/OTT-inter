import { useContext, useEffect, useState } from 'react'
import Button from '~/components/button'
import Player from '~/components/Player'
import UserContext from '~/contexts/UserContext'
import { IS_PRODUCTION } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import { CONFIG } from '~/config'
import { ThemeContext } from 'styled-components'
import Color from 'color'
import ClubLogo from '~/components/LogoClub'
import Router from "next/router";
import apiService from '~/services/api'
import moment from "moment";
import PlayerHls from "components/PlayerHsl"
import LogoApp from '../LogoApp'


export default function BlockedPlayer({ image = '', media, sub = null }) {
  const { user } = useContext(UserContext)
  const { is_paid: isPaid } = media
  const [showVideo, setShowVideo] = useState()
  const [expired, setExpired] = useState();
  if (!sub) {
    sub = {}
  }

  const autoPlay = IS_PRODUCTION
  const { openAuthModal } = useContext(AuthModalContext)
  const [isValid, setIsValid] = useState(true)
  const [plan, setPlan] = useState(true)


  useEffect(_ => {

    (async _ => {

      const packdata = await apiService().get('packages')

      let pack = packdata.data
      let packages = { items: pack }

       const planCurrent = await apiService().get(`subscription-pack/${sub.user_id}`)
       setPlan(planCurrent.data);

      let date_end = moment(sub.ends_at)
      let hj = moment();

      if (isPaid && (hj > date_end)) {
        setIsValid(false)
        if (sub.package_id !== 1) {
          setExpired(true);
        }
      } else {
        setIsValid(true)
      }

    })();

  }, [isValid])


  useEffect(_ => {

    if (isPaid && !sub.package_id) {
      setShowVideo(false);
    } else if (isPaid && sub != null && sub.package_id !== 1 && isValid == true) {
      setShowVideo(true)
    } else if (!isPaid && user && isValid == true) {
      setShowVideo(true)
    } else if (!isPaid && !user) {
      setShowVideo(false)
    }


  }, [isPaid, user, isValid])

  const checkUserRegistration = () => {

    let usuarioCheck = user
    if (user && usuarioCheck.name && usuarioCheck.email && usuarioCheck.document && usuarioCheck.address && usuarioCheck.country_id) {
      return true;
    }
    return false;
  }

  //ALTER PLANO
  const handleAuth = () => {

      let userValid = checkUserRegistration();
      if(plan && plan.id!=null && plan.id!=1 || expired==true) {
        userValid ? Router.push({
          pathname: "/user/changePlan/pay",
          query: {
            package_id: plan.id
          },
        }) : Router.push('/register/wizard/complete-test');

    } else {
      openAuthModal('register')
    }
  }

  //ALTER PLANO GRATIS
  const handleAuthFree = ()=> {
      if (!sub.package_id || sub.package_id == 1) {

        let userValid = checkUserRegistration();
          userValid ? Router.push('/user/changePlan') : Router.push('/register/wizard/complete-test');
    }
  }

  const youtube_type_id = 3
  const youtube_link = media.movie_links.find(element => {
    return element.movie_link_type_id === youtube_type_id
  })
  const hls_type_id = 1
  const hls_link = media.movie_links.find(element => {
    return element.movie_link_type_id === hls_type_id
  })


  let probaGratis = CONFIG.lang === 'es-CL' ? 'Prueba gratis' : 'Probá Gratis'

  if (!sub.package_id || sub.package_id == 1) {
    probaGratis = 'Activa un plan premium'
  }

  if (!sub.package_id || sub.package_id == 1 && !user) {
    probaGratis = 'Registrarse'

  }


  const handleLogin = e => {
    e.preventDefault()
    openAuthModal('login')
  }

  let alreadyRegistered = CONFIG.lang === 'es-CL' ? '¿Ya estás suscrito?' : '¿Ya eres suscriptor?'

  if (sub.package_id === 1) {
    alreadyRegistered = "¿Ya estás suscrito a algún plan premium?";
  }

  const login = CONFIG.lang === 'es-CL' ? 'Inicia sesión' : 'Ház login'

  const theme = useContext(ThemeContext)
  const maskColor = Color(theme.colors.black).fade(.3).hsl().string()

  return (
    <div className="player">
      {
        expired ? (
            <>
              <img src={ image } width="822" height="464" className="img-fluid"/>
              <div className="block-msg text-center">

                <div className="text-block">
                  <p><strong>Actualiza tu información de pago para continuar</strong></p>
                  <p className="d-none d-md-block"><small>No fue posible procesar tu último pago. Actualiza tus datos para
                    seguir viendo La U Play</small></p>
                </div>

                <Button onClick={ handleAuth }>Actualizar tu pago</Button>

                <div className="bold text-block">
                  <p>
                  </p>
                </div>
              </div>

            </>
          )
          : showVideo && isValid ? (
            (media && media.movie_links && media.movie_links.length && !youtube_link && !hls_link == 1) ? (
              <div style={ { position: 'relative' } }>
                <Player
                  height="100%"
                  media={ media }
                  poster={ image }
                  user={ sub }
                  style={ { padding: '56.44% 0 0 0', position: 'relative' } }
                  width="100%"
                />
              </div>
            ) : youtube_link && !hls_link == 1 ? (
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  allow={ `accelerometer; ${ autoPlay ? 'autoplay;' : '' } encrypted-media; gyroscope; picture-in-picture` }
                  allowFullScreen
                  className={ `embed-responsive-item` }
                  frameBorder="0"
                  src={ `${ youtube_link.url }?${ autoPlay ? 'autoplay=1' : '' }` }
                ></iframe>
              </div>
            ) : hls_link ? (
              <div className="embed-responsive embed-responsive-16by9 player-hls">
                <PlayerHls
                  url={ hls_link.url }
                  media={ media }
                  autoplay={ false }
                  controls={ true }
                  width="100%"
                  height="auto"
                />
              </div>

            ) : (
              "Couldn't parse url"
            )
          ) : user ? (
            <>
              <img src={ image } width="822" height="464" className="img-fluid"/>
              <div className="block-msg text-center">

                <div className="text-block">
                  <p><strong>Este contenido es exclusivo para los suscriptores de algún plan premium</strong></p>
                  <p className="d-none d-md-block"><small>Vuélvete premium y accede a todo el contenido cuando y donde
                    quieras!</small></p>
                </div>

                <Button onClick={ handleAuthFree }>{ probaGratis }</Button>

                <div className="bold text-block">
                  <p>
                    {/* { alreadyRegistered }
                { ' ' }
                <a className="text-uppercase" href="/login" onClick={ handleLogin }>{ login }</a> */ }
                  </p>
                </div>
              </div>

            </>
          ) : (
            <>
              <img src={ image } width="822" height="464" className="img-fluid"/>
              <div className="block-msg text-center">
                <div className="details">
                  <div  className="logo-club">
                  <ClubLogo alt={`${CONFIG.clubName} Logo`} /></div>
                  UNIVERSIDAD DE CHILE
                  </div>
                  <hr></hr>
                <div>
                <div className="details">Regístrate en<div className="tamanho"><LogoApp/></div>  para ver este contenido</div>

                  <p>Tendrás acceso a:</p><br></br>
                    <div className="details-msg">
                      <ul>
                        <li>Series y documentales originales</li>
                        <li className="li-A">Transmisiones en vivo</li>
                      </ul>
                      <ul>
                         <li className="li-B">Contenido exclusivo de jugadores</li>
                         <li>información exclusivo del club</li>
                      </ul>

                    </div>
                </div>

                <Button onClick={ handleAuth }>{ probaGratis }</Button>

                <div className="bold text-block">
                  <p>
                    {/* { alreadyRegistered }
                { ' ' }
                <a className="text-uppercase" href="/login" onClick={ handleLogin }>{ login }</a> */ }
                  </p>
                </div>
              </div>

            </>

          ) }
     <style jsx>{ `
     .logo-club{
        width:70px;
        padding: 10px;
        margin-top: -27px;
     }
     hr {
      margin-top:-15px;
      height: 2px;
      background-image: linear-gradient(to left, #3e3973, #7d0017);
       width: 100%;
      }
     }
     .li-A {
       text-align: initial;
       margin-left:71px;
       padding-top: 20px;
     }
     .li-B {
      text-align: initial;
      margin-left: 17px;
      padding-bottom: 20px;


     }
     .details{
       display:flex;
       font-weight: 600;

     }
     .details-msg{
        font-size:15px;
       display:flex;
       justify-content: space-between;
       text-align: initial;

     }
     .tamanho{
      width:160px;
      padding:0px 14px 4px 16px;
      margin-top: 1px

     }
   @media(max-width:600px){

     ul{
       text-align:center!important;
       margin:0px!important;
       padding:0px!important;

     }
     li{
       text-align:center!important;
      margin:0px!important;
      padding:0px!important;
      list-style-type:none;
     }

     hr{
       -10px;
     }

     .details-msg{
        font-size:15px;
       display:contents;

     }

        }

        .block-msg {
          align-items: center;
          background-color: ${ maskColor };
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
          color: var(--white);
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
      ` }</style>
    </div>
  )
}
