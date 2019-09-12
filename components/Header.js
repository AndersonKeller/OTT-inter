import React from 'react'
import Link from 'next/link'
import ReactSVG from 'react-svg'
import Chevron from './icons/chevron'

const links = [
  { href: '/', label: 'Home' },
  { href: '/videos', label: 'Videos' },
  { href: '/podcasts', label: 'Podcasts' },
  { href: '/entrevistas', label: 'Entrevistas' },
  { href: '/fotos', label: 'Fotos' },
  { href: '/sorteos', label: 'Sorteos' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Header = props => (
  <>
    <header className={"header" + (props.closed ? " header--closed" : '')}>
      <nav className="nav">

        {/* logo */}
        <h1 className="logo">
          <Link href="/">
            <a><img alt="Dale Campeón" src="/static/logo.svg" /></a>
          </Link>
        </h1>

        { ! props.closed && (
          <>
            {/* menu */}
            <ul className="menu d-none d-md-flex">
              {links.map(({ key, href, label }) => (
                <li key={key}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>

            {/* form */}
            <form className="d-none d-md-block" method="post">
              <button className="search-btn" type="button">
                <img alt="Buscar" height="28" src="/static/magnify-icon.svg" width="28" />
              </button>
              <input className="form-control" placeholder="Buscar" type="search" />
            </form>

            {/* notifications */}
            <button className="notifications-btn d-none d-md-inline-block" type="button">
              <img alt="Notificações" height="27" src="/static/notification-icon.svg" width="18" />
            </button>

            {/* user */}
            <Link href={{ pathname: '/', query: { login: true } }}>
              <div className="user-select d-none d-md-flex">
                <div className="avatar">
                  <img alt="Avatar" height="31" src="/static/avatar-icon.svg" width="24" />
                </div>
                <Chevron alt="Select" height="9" width="16" />
              </div>
            </Link>

            {/* gad logo */}
            <a className="signature d-none d-md-inline" href="http://somosgad.com" target="_blank">
              <img alt="GAD_" height="36" src="/static/gad-logo.svg" width="66" />
            </a>
          </>
        ) }

      </nav>
    </header>
    <style jsx>{`
      .header {
        background-color: rgba(0, 0, 0, .57);
        color: var(--gray);
        font-family: 'Helvetica', sans-serif;
        font-size: 21.5px;
        font-weight: bold;
        padding: 20px 45px;
        position: fixed;
        width: 100%;
        z-index: 10;
      }
      .header--closed {
        background-color: var(--black);
        position: static;
      }
      .nav {
        display: flex;
        align-items: center;
      }
      .header--closed .nav {
        justify-content: center;
      }
      .logo {
        height: auto;
        margin-top: 0;
        margin-right: 30px;
        margin-bottom: 0;
        min-height: 67px;
        width: 131px;
      }
      .header--closed .logo {
        margin-right: 0;
      }
      .menu {
        display: none;
        justify-content: space-between;
        margin-top: 0;
        margin-right: auto;
        margin-bottom: 0;
        padding-left: 0;
      }
      .menu li {
        display: flex;
        padding: 10px;
      }
      @media (min-width: 1367px) {
        .menu li {
          padding-right: 20px;
          padding-left: 20px;
        }
      }
      .menu a {
        font-size: inherit;
        text-decoration: none;
        transition: color .2s;
      }
      .menu a:focus,
      .menu a:hover {
        color: #fff;
      }
      .form-control {
        background-color: transparent;
        border: 0;
        display: inline-block;
        color: #fff;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        outline: 0;
        padding: 0;
        vertical-align: middle;
        width: 95px;
      }
      .form-control::placeholder {
        color: #b2b2b2;
      }
      .search-btn {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        margin-right: 10px;
        outline: 0;
        padding: 5px;
        vertical-align: middle;
      }
      .notifications-btn {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        outline: 0;
        margin-right: 25px;
        padding: 5px;
        vertical-align: middle;
      }
      .user-select {
        align-items: center;
        display: flex;
        margin-right: 30px;
      }
      .avatar {
        align-items: center;
        background-color: var(--gray);
        border-radius: 50%;
        display: flex;
        height: 45px;
        justify-content: center;
        margin-right: 7px;
        padding: 5px;
        width: 45px;
      }
    `}</style>
  </>
)
export default Header
