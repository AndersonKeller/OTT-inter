import { useState } from 'react'
import Link from 'next/link'
import Button from '../components/button'

export default function BlockedPlayer(props) {
  const [ video, setVideo ] = useState(false)
  const showVideo = () => {
    setVideo(true)
  }
  return (
    <div className="player">
      {video ? (
        <>
          <div style={{padding:'56.44% 0 0 0',position:'relative'}}><iframe src="https://player.vimeo.com/video/330250376?autoplay=1&amp;loop=1&amp;color=ff0000&amp;title=0&amp;byline=0&amp;portrait=0"
            style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
            frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe></div>
        </>
      ) : (
        <>
          <img src={props.image} width="822" height="464" className="img-fluid" />
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
