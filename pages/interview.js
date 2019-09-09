import Layout from '../components/layout'
import Button from '../components/button'
import Link from 'next/link'
import Head from 'next/head'
import Card from '../components/card'
import CarouselSection from '../components/carousel-section'
import { useState } from 'react'

export default function InterviewPage() {
  return (
    <Layout>
      <Head>
        <title>Entrevista</title>
      </Head>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <Player />
          </div>
          <div className="col-12 col-lg-4 d-none d-md-block">
            <MoreInterviewCards />
          </div>
        </div>
        <Description />
        <div className="icons-row row">
          <div className="col">
            <LikeNCommentBtns />
          </div>
          <div className="col text-right">
            <SocialShareBtns />
          </div>
        </div>
        <div className="d-md-none">
          <MoreInterviewCards />
        </div>
      </div>
      <CarouselSection2 />
      <Comments />
      <style jsx>{`
        .row:first-child {
          margin-bottom: 15px;
        }
        .icons-row {
          margin-bottom: 25px;
        }
        @media (min-width: 1200px) {
          .container-fluid {
            padding-right: 4%;
            padding-left: 4%;
          }
          .row:first-child {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </Layout>
  );
}

function Player() {
  return (
    <div className="player">
      <img src="/static/interview/sample.png" width="822" height="464" className="img-fluid" />
      <div className="block-msg text-center">
        <div className="text-block">
          <p><strong>Este contenido es exclusivo para los suscriptores</strong></p>
          <p className="d-none d-md-block"><small>Ver las novelas, series, humor, películas y dibujos cuando y donde quieras.</small></p>
        </div>
        <Link href="/subscriptor">
          <Button>Probá 7 días Gratis</Button>
        </Link>
        <div className="text-block">
          <p><strong><span className="text-uppercase d-none d-md-inline">Pruebe 7 días gratis</span><br className="d-none d-md-inline" />
            ¿Ya es suscriptor? <span className="text-uppercase">Haga <Link href="/login"><a>login</a></Link></span></strong></p>
        </div>
      </div>
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

function MoreInterviewCards() {
  const moreInterviews = [
    {
      img: '/static/interviews/thumb1.png', 
      title: 'Entrevista a Javier Pinola', 
      text: 'EXCLUSIVO #DaleCampeon | Hablamos mano a mano con Javier Pinola: "Estoy muy contento con este presente. Al principio me costó adaptarme"', 
    },
    {
      img: '/static/interviews/thumb2.png', 
      title: 'Mano a mano con Javier Pinola', 
      text: 'El jugador del Más Grande habló de su carrera en una entrevista exclusiva con Dale Campeón.', 
    },
    {
      img: '/static/interviews/thumb3.png', 
      title: 'Pinola: "Queremos seguir ganando y sumando confianza"', 
      text: 'La palabra de Javier Pinola luego del triunfo ante San Martín. ¡Escuchalo! ', 
    }
  ]
  return (
    <div>
      { moreInterviews.map((interview) => (
        <MoreInterviewCard interview={interview} />
      )) }
    </div>
  )
}

function MoreInterviewCard(props) {
  return (
    <div className="more-card">
      <Link href="/interview">
        <a>
          <div className="row align-items-center gutter-15">
            <div className="col-7">
              <img src={props.interview.img} width="220" height="123" className="img-fluid" />
            </div>
            <div className="col-4">
              <p><strong>{props.interview.title}</strong></p>
            </div>
          </div>
        </a>
      </Link>
      <style jsx>{`
        .more-card {
          font-size: 11px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        .more-card a {
          display: block;
          text-decoration: none;
        }
        .more-card p {
          margin-bottom: 0;
        }
        @media (min-width: 768px) {
          .more-card {
            line-height: 1.75;
            margin-bottom: 0;
            padding-top: 15px;
            padding-bottom: 15px;
          }
        }
      `}</style>
    </div>
  )
}

function Description() {
  return (
    <div className="description">
      <h1 className="h2">Mano a mano con Javier Pinola</h1>
      <div className="year">2019</div>
      <div className="text">
        <p>El jugador del Más Grande habló de su carrera en una entrevista exclusiva con Dale Campeón.</p>
      </div>
      <style jsx>{`
        .h2,
        .year {
          margin-bottom: 10px;
        }
        .text {
          margin-bottom: 20px;
        }
        @media (min-width: 768px) {
          .description {
            margin-left: 10px;
          }
          .text {
            margin-bottom: 35px;
          }
        }
      `}</style>
    </div>
  )
}

function LikeNCommentBtns() {
  const [like, setLike] = useState(false);
  async function handleLike() {
    setLike( ! like);
  }
  return (
    <div>
      <button className={`like-btn ${like ? 'liked' : ''}`} onClick={_ => handleLike()} type="button">
        <img src="/static/like-icon.svg" width="35" height="30" />
        <span>62</span>
      </button>
      <button className="comment-btn" type="button" onClick={_ => { document.location.hash = 'comments' }}>
        <img src="/static/comment-icon.svg" width="36" height="32" />
        <span>2</span>
      </button>
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          color: var(--mid-gray);
          cursor: pointer;
          font-size: 16px;
          outline: 0;
          padding: 5px 10px 5px 5px;
        }
        button:focus,
        button:hover {
          color: var(--white);
        }
        .liked {
          color: red !important;
        }
        img {
          margin-right: 5px;
          max-height: 20px;
          vertical-align: middle;
          width: auto;
        }
        @media (min-width: 768px) {
          button {
            font-size: 20px;
            padding: 10px;
          }
          img {
            margin-right: 10px;
            max-height: 32px;
          }
        }
      `}</style>
    </div>
  )
}

function SocialShareBtns() {
  return (
    <div>
      <button aria-description="Share at Instagram" className="instagram-btn" type="button">
        <img src="/static/instagram-icon.svg" width="42" height="42" />
      </button>
      <button aria-description="Share at Facebook" className="facebook-btn" type="button">
        <img src="/static/facebook-icon.svg" width="42" height="42" />
      </button>
      <button aria-description="Share at Twitter" className="twitter-btn" type="button">
        <img src="/static/twitter-icon.svg" width="42" height="42" />
      </button>
      <style jsx>{`
        button {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          outline: 0;
          padding: 5px;
        }
        img {
          max-height: 25px;
          width: auto;
        }
        @media (min-width: 768px) {
          img {
            max-height: 42px;
          }
        }
      `}</style>
    </div>
  )
}

function CarouselSection2() {
  return (
    <aside className="carousel-section">
      <CarouselSection title="Platenences">
        <Card src="/static/cards/platenences/1.jpg" />
        <Card src="/static/cards/platenences/2.jpg" />
        <Card src="/static/cards/platenences/3.jpg" />
        <Card src="/static/cards/platenences/4.jpg" />
        <Card src="/static/cards/platenences/5.jpg" />
        <Card src="/static/cards/platenences/6.jpg" />
        <Card src="/static/cards/platenences/7.jpg" />
      </CarouselSection>
      <div className="text-center">
        <Link href="entrevistas">
          <Button className="text-uppercase" color="secondary">Más Entrevistas</Button>
        </Link>
      </div>
      <style jsx>{`
        .carousel-section {
          background-color: var(--dark-gray3);
          margin-bottom: 30px;
          padding-top: 30px;
          padding-bottom: 45px;
        }
        @media (min-width: 768px) {
          .carousel-section {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </aside>
  )
}

function Comments() {
  const recent = [
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
  ]
  const popular = [
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
  ]
  return (
    <section className="comments container" id="comments">
      <header>
        <h2 className="h2">Comentarios</h2>
        <div className="text">
          <p>Los comentarios son responsabilidad exclusiva de los autores y no representan la opinión de este sitio. Si encuentra algo que viole los términos de uso, denuncie. Lea <strong>las preguntas más frecuentes</strong> para saber qué es inapropiado o ilegal.</p>
        </div>
        <div className="blocked">
          <p><strong>Este contenido ya no recibe más comentarios.</strong></p>
        </div>
      </header>
      <div className="row">
        <div className="col">
          <button type="button">Recientes</button>
        </div>
        <div className="col">
          <button type="button">Populares</button>
        </div>
      </div>
      <div>
        <div id="recents">
          { recent.map((comment) => {
            return (
              <Comment comment={comment} />
            )
          }) }
        </div>
        <div className="d-none" id="popular">
          { popular.map((comment) => {
            return (
              <Comment comment={comment} />
            )
          }) }
        </div>
      </div>
      <style jsx>{`
        .comments {
          margin-bottom: 75px;
          max-width: 960px;
        }
        header {
          font-size: 11px;
          line-height: 1.75;
        }
        .h2 {
          margin-bottom: 30px;
        }
        .text,
        .blocked {
          margin-bottom: 15px;
        }
        @media (min-width: 768px) {
          .text,
          .blocked {
            margin-bottom: 45px;
          }
        }
      `}</style>
    </section>
  )
}

function Comment(props) {
  return (
    <div className="comment">
      <img className="avatar" src="/static/comment-avatar-icon.svg" width="71" height="71" />
      <h4 className="name">{props.comment.name}</h4>
      <div className="text">
        <p>{props.comment.message}</p>
      </div>
      <style jsx>{`
        .comment {
          border-bottom: 2px solid rgba(128, 128, 128, .25);
          font-size: 15px;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .avatar {
          float: left;
          margin-right: 15px;
        }
        .name {
          font-size: 20px;
          font-weight: normal;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        .text {
          color: var(--gray2);
        }
      `}</style>
    </div>
  )
}
