import { useContext, useEffect, useState } from 'react'
import Button from '~/components/button'
import Player from '~/components/Player'
import UserContext from '~/contexts/UserContext'
import { IS_PRODUCTION } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import { CONFIG } from '~/config'
import { ThemeContext } from 'styled-components'
import Color from 'color'

export default function BlockedPlayer({ image = '', media }) {
  const { user } = useContext(UserContext)
  const { is_paid: isPaid } = media
  const [ showVideo, setShowVideo ] = useState()
  const autoPlay = IS_PRODUCTION
  const { openAuthModal } = useContext(AuthModalContext)

  useEffect(_ => {
    setShowVideo(!isPaid || isPaid && user)
  }, [isPaid, user])

  const handleAuth = e => {
    e.preventDefault()
    openAuthModal('register')
  }

  const youtube_type_id = 3
  const youtube_link = media.movie_links.find(element => {
    return element.movie_link_type_id === youtube_type_id
  })

  const probaGratis = CONFIG.lang === 'es-CL' ? 'Prueba gratis' : 'Probá Gratis'

  const handleLogin = e => {
    e.preventDefault()
    openAuthModal('login')
  }

  const alreadyRegistered = CONFIG.lang === 'es-CL' ? '¿Ya estás suscrito?' : '¿Ya eres suscriptor?'

  const login = CONFIG.lang === 'es-CL' ? 'Inicia sesión' : 'Ház login'

  const theme = useContext(ThemeContext)
  const maskColor = Color(theme.colors.black).fade(.3).hsl().string()

  return (
    <div className="player">
      { showVideo ? (
        (media && media.movie_links && media.movie_links.length && ! youtube_link) ? (
          <div style={{ position:'relative' }}>
            <Player
              height="100%"
              media={media}
              poster={image}
              style={{ padding: '56.44% 0 0 0', position: 'relative' }}
              width="100%"
            />
          </div>
        ) : (
          <div className="embed-responsive embed-responsive-16by9" >
            <iframe
              allow={`accelerometer; ${autoPlay ? 'autoplay;' : ''} encrypted-media; gyroscope; picture-in-picture`}
              allowFullScreen
              className={`embed-responsive-item`}
              frameBorder="0"
              src={`${youtube_link.url}?${autoPlay ? 'autoplay=1' : ''}`}
            ></iframe>
          </div>
        )
      ) : (
        <>
          <img src={image} width="822" height="464" className="img-fluid" />
          <div className="block-msg text-center">

            <div className="text-block">
              <p><strong>Este contenido es exclusivo para los suscriptores</strong></p>
              <p className="d-none d-md-block"><small>Ver los videos cuando y donde quieras.</small></p>
            </div>

            <Button onClick={handleAuth}>{probaGratis}</Button>

            <div className="bold text-block">
              <p>
                {alreadyRegistered}
                {' '}
                <a className="text-uppercase" href="/login" onClick={handleLogin}>{login}</a>
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
          background-color: ${maskColor};
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
      `}</style>
    </div>
  )
}
