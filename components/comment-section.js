import { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'

export default function CommentSection() {
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

      <CommentTabs />

      <style jsx>{`
        .comments {
          margin-bottom: 30px;
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
          .comments {
            margin-bottom: 75px;
          }
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

function CommentTabs(props)
{
  const comments = [
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
    {
      name: 'Your name here',
      message: 'Lorem Ipsum Dolor',
    },
  ]
  const tabs = [
    {
      name: 'Recientes',
      slug: 'recents',
      content: comments,
    },
    {
      name: 'Populares',
      slug: 'popular',
      content: comments,
    }
  ]
  function handleTab(k, e) {
    const tabBar = document.querySelector('#tab-bar');
    const tabItem = document.querySelector('#comment-tabs-tab-' + k).parentElement;
    const key = tabItem.attributes['data-key'].value
    const position = key * 100
    tabBar.style.transform = `translateX(${position}%)`;
    setKey(k)
  }
  const [key, setKey] = useState('recents');
  return (
    <Tab.Container activeKey={key} id="comment-tabs" onSelect={(k, e) => handleTab(k, e)}>
      <div className="nav-tabs-container">
        <Nav variant="tabs">
          { tabs.map((tab, index) => {
            return (
              <Nav.Item data-key={index} key={index}>
                <Nav.Link eventKey={tab.slug}>{tab.name}</Nav.Link>
              </Nav.Item>
            )
          }) }
          <div className="tab-bar" id="tab-bar"></div>
        </Nav>
      </div>
      <Tab.Content>
        { tabs.map((tab, index) => {
          return (
            <Tab.Pane eventKey={tab.slug} key={index}>
              { tab.content.map((comment, contentIndex) => {
                return <Comment comment={comment} key={contentIndex} />
              }) }
            </Tab.Pane>
          )
        }) }
      </Tab.Content>
      <style jsx global>{`
        .nav-tabs-container {
          overflow: auto;
          margin-right: -15px;
          margin-left: -15px;
          padding-right: 15px;
          padding-left: 15px;
          white-space: nowrap;
        }
        .nav-tabs {
          border-bottom: 0;
          display: inline-flex;
          flex-wrap: nowrap;
          min-width: 100%;
          padding-bottom: 5px;
          position: relative;
          text-align: center;
          text-transform: uppercase;
        }
        .nav-tabs .nav-item {
          flex-grow: 1;
          margin-bottom: 0;
        }
        .nav-tabs .nav-link {
          background-color: transparent !important;
          border: 1px solid rgba(128, 128, 128, .5) !important;
          border-radius: 0;
          color: var(--white) !important;
          font-size: 11px;
          font-weight: bold;
          line-height: 1.63;
          padding: 15px;
          transition: background-color .15s;
        }
        .nav-tabs .nav-link:focus,
        .nav-tabs .nav-link:hover {
          background-color: rgba(255, 255, 255, .04) !important;
        }
        .nav-tabs .tab-bar {
          bottom: 2px;
          position: absolute;
          transition: transform .250s;
          width: ${100 / tabs.length}%;
        }
        .nav-tabs .tab-bar::before {
          background-color: var(--gray);
          content: '';
          display: block;
          height: 5px;
          margin-right: auto;
          margin-left: auto;
          width: 53.125%;
        }
      `}</style>
    </Tab.Container>
  )
}
