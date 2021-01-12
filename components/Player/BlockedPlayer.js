import { useContext, useEffect, useState } from 'react'
import Button from '~/components/button'
import Player from '~/components/Player'
import UserContext from '~/contexts/UserContext'
import { IS_PRODUCTION } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import { CONFIG } from '~/config'
import { ThemeContext } from 'styled-components'
import Color from 'color'
import Router from "next/router";
import apiService from '~/services/api'
import { date } from 'yup'
import moment from "moment";

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
      let periodo;
      let op_plan;

      const packdata = await apiService().get('packages')
      let pack = packdata.data
      let packages = { items: pack }

      if (sub.package_id) {
        setPlan(packages.items.find(item => item.id == sub.package_id))
      } else {
        setPlan(packages.items.find(item => item.amount == 0))
      }


      let date_end = moment(sub.ends_at)
      let hj = moment();

      if (isPaid && (hj > date_end)) {
        setIsValid(false)
        if (sub.package_id !== 1) {
          setExpired(true);
        }
      } else {
        // window.alert('b');
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

  const handleAuth = e => {
    e.preventDefault()
    if (!sub.package_id || sub.package_id == 1 || expired) {
      Router.push('/register/wizard/complete-test');
    } else {
      openAuthModal('register')
    }

  }

  const youtube_type_id = 3
  const youtube_link = media.movie_links.find(element => {
    return element.movie_link_type_id === youtube_type_id
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
            <img src={image} width="822" height="464" className="img-fluid" />
            <div className="block-msg text-center">

              <div className="text-block">
                <p><strong>Actualiza tu información de pago para continuar</strong></p>
                <p className="d-none d-md-block"><small>No fue posible procesar tu último pago. Actualiza tus datos para seguir viendo La U Play</small></p>
              </div>

              <Button onClick={handleAuth}>Actualizar tu pago</Button>

              <div className="bold text-block">
                <p>
                </p>
              </div>
            </div>

          </>
        )
          : showVideo && isValid ? (
            (media && media.movie_links && media.movie_links.length && !youtube_link) ? (
              <div style={{ position: 'relative' }}>
                <Player
                  height="100%"
                  media={media}
                  poster={image}
                  user={sub}
                  style={{ padding: '56.44% 0 0 0', position: 'relative' }}
                  width="100%"
                />
              </div>
            ) : youtube_link ? (
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  allow={`accelerometer; ${autoPlay ? 'autoplay;' : ''} encrypted-media; gyroscope; picture-in-picture`}
                  allowFullScreen
                  className={`embed-responsive-item`}
                  frameBorder="0"
                  src={`${youtube_link.url}?${autoPlay ? 'autoplay=1' : ''}`}
                ></iframe>
              </div>
            ) : (
                  "Couldn't parse url"
                )
          ) : user ? (
            <>
              <img src={image} width="822" height="464" className="img-fluid" />
              <div className="block-msg text-center">

                <div className="text-block">
                  <p><strong>Este contenido es exclusivo para los suscriptores de algún plan premium</strong></p>
                  <p className="d-none d-md-block"><small>Vuélvete premium y accede a todo el contenido cuando y donde
                quieras!</small></p>
                </div>

                <Button onClick={handleAuth}>{probaGratis}</Button>

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
                  <img src={image} width="822" height="464" className="img-fluid" />
                  <div className="block-msg text-center">

                    <div className="text-block">
                      <p><strong>
                        Es necesario registrarse para ver el contenido</strong></p>

                    </div>

                    <Button onClick={handleAuth}>{probaGratis}</Button>

                    <div className="bold text-block">
                      <p>
                        {/* { alreadyRegistered }
                { ' ' }
                <a className="text-uppercase" href="/login" onClick={ handleLogin }>{ login }</a> */ }
                      </p>
                    </div>
                  </div>

                </>

              )}
      <style jsx>{`
        .player {
          overflow: hidden;
          position: relative;
        }
        .block-msg {
          align-items: center;
          background-color: ${ maskColor};
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
