import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import Button from '~/components/button'
import Player from '~/components/Player'
import UserContext from '~/contexts/UserContext'
import { IS_PRODUCTION } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'

function BlockedPlayer({ image = '', media }) {

  const { user } = useContext(UserContext)
  const [ video, setVideo ] = useState(user ? 1 : 0)
  const autoPlay = IS_PRODUCTION
  const { openAuthModal } = useContext(AuthModalContext)
  const { t } = useTranslation()
  const probaGratis = t('common:proba-gratis')

  // open auth modal
  const handleAuth = e => {
    e.preventDefault()
    openAuthModal('register')
  }

  const handleLogin = e => {
    e.preventDefault()
    openAuthModal('login')
  }

  // show or hide video if has user
  useEffect( _ => {
    setVideo(user ? 1 : 0)
  }, [user])

  const youtube_type_id = 3
  const youtube_link = media.movie_links.find(element => {
    return element.movie_link_type_id === youtube_type_id
  })

  return (
    <div className="player">
      { video ? (
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
            <Button onClick={e => handleAuth(e)}>{probaGratis}</Button>
            <div className="text-block">
              <p><strong><span className="text-uppercase d-none d-md-inline">Prueba gratis</span><br className="d-none d-md-inline" />
                ¿Ya ere suscriptor?
                {' '}
                <span className="text-uppercase">
                  Ház <Link href="/login"><a onClick={e => handleLogin(e)}>login</a></Link>
                </span>
              </strong></p>
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

export default BlockedPlayer
