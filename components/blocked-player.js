import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '../components/button'
import UserContext from './UserContext'
import { IS_PRODUCTION } from '../constants/constants'
import VideoPlayer from '../components/video-player'

export default function BlockedPlayer({ image = '', video_link = '' }) {
  const { user } = useContext(UserContext)
  const [ video, setVideo ] = useState(user ? 1 : 0)

  const showVideo = (e) => {
    e.preventDefault()
    setVideo(true)
  }

  useEffect(_ => {
    setVideo(user ? 1 : 0)
  }, [user])

  return (
    <div className="player">
      { video ? (
        (video_link.ready_url) ? (
        <div style={{position:'relative'}}>
          <VideoPlayer
            height="100%"
            link = { video_link.ready_url }
            poster = { image }
            style={{padding:'56.44% 0 0 0',position:'relative'}}
            width="100%"
          />
        </div>
        ) : (
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="505"
            src={`${video_link.iframeurl}?autoplay=1`}
            width="820"
          ></iframe>
        )
      ) : (
        <>
          {/* Aqui */}
          <img src={image} width="822" height="464" className="img-fluid" />
          <div className="block-msg text-center">
            <div className="text-block">
              <p><strong>Este contenido es exclusivo para los suscriptores</strong></p>
              <p className="d-none d-md-block"><small>Ver las novelas, series, humor, películas y dibujos cuando y donde quieras.</small></p>
            </div>
            {/* <Link href="/subscriptor">
              <Button>Probá Gratis</Button>
            </Link> */}
            <Button onClick={(e) => showVideo(e)}>Probá Gratis</Button>
            <div className="text-block">
              <p><strong><span className="text-uppercase d-none d-md-inline">Pruebe gratis</span><br className="d-none d-md-inline" />
                ¿Ya es suscriptor? <span className="text-uppercase">Haga <Link href="/login"><a>login</a></Link></span></strong></p>
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
