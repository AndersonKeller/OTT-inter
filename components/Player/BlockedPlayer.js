import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '~/components/button'
import Player from '~/components/Player'
import UserContext from '~/contexts/UserContext'
import { IS_PRODUCTION } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'

export default function BlockedPlayer({ image = '', media}) {
  const { user } = useContext(UserContext)
  const [ video, setVideo ] = useState(user ? 1 : 0)
  const autoPlay = IS_PRODUCTION
  const { openAuthModal } = useContext(AuthModalContext)
  const [link,setLink] = useState(media.video_link.ready_url)

  // open auth modal
  const handleAuth = e => {
    e.preventDefault()
    openAuthModal('register')
  }

  // show or hide video if has user
  useEffect( _ => {
    setVideo(user ? 1 : 0)
  }, [user])

  useEffect(_ => {
    setLink(media.video_link.ready_url + '?' + Math.round(Math.random() * 999))
    console.log(link)
  }, [media])

  return (
    <div className="player">
      { video ? (
        (media && media.video_link && media.video_link.ready_url) ? (
          <div style={{ position:'relative' }}>
            <Player
              height="100%"
              link={link}
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
              src={`${media.video_link.iframeurl}?${autoPlay ? 'autoplay=1' : ''}`}
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
            <Button onClick={e => handleAuth(e)}>Probá Gratis</Button>
            <div className="text-block">
              <p><strong><span className="text-uppercase d-none d-md-inline">Prueba gratis</span><br className="d-none d-md-inline" />
                ¿Ya ere suscriptor? <span className="text-uppercase">Ház <Link href="/login"><a>login</a></Link></span></strong></p>
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
