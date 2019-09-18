import classNames from 'classnames'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ReactSVG from 'react-svg'

import UserContext from '../components/UserContext'
import Chevron from './icons/chevron'

const Header = (props) => {

  // menu
  const menu = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'Entrevistas', href: '/entrevistas' },
    { label: 'Fotos', href: '/fotos' },
    { label: 'Sorteos', href: '/sorteos', visibility: 'publicOnly' },
    {
      label: 'Más',
      dropdown: [
        { label: 'Sorteos', href: '/sorteos' },
        { label: 'Historia del Club', href: '/historia-del-club' },
        { label: 'Infantil', href: '/infantil' },
        { label: 'Variedades', href: '/variedades' },
        { label: 'Realities', href: '/realities' },
        { label: 'Noticias', href: '/noticias' },
        { label: 'Otros deportes', href: '/otros-deportes' },
        { label: 'Especiales', href: '/especiales' },
        { label: 'Salud y Bienestar', href: '/salud-y-bienestar' },
      ],
      visibility: 'private',
    },
  ]

  // user context
  const { user, signIn, signOut } = useContext(UserContext)

  // auth
  const toogleAuth = (e) => {
    e.preventDefault()
    if (user) {
      signOut()
    } else {
      signIn('test_user')
    }
  }

  // scrolled state
  const [ scrolled, setScrolled ] = useState()
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 1) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  // classes
  const classes = classNames('header', {
    closed: props.closed,
    scrolled: scrolled,
  })

  return (
    <header className={classes}>
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
              { menu.map(({ label, href, visibility, dropdown }, i) => {
                return ( ! visibility ||
                  visibility === 'publicOnly' && ! user ||
                  visibility === 'private' && user) && (
                  <li key={i}>
                    { dropdown ? (
                      <NavDropdown id="basic-nav-dropdown" title={label}>
                        { dropdown.map(({ label, href }, k) => (
                          <NavDropdown.Item href={href} key={k}>{label}</NavDropdown.Item>
                        )) }
                      </NavDropdown>
                    ) : (
                      <a href={href}>{label}</a>
                    ) }
                  </li>
                )
              }) }
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
            <div className="user-select d-none d-md-flex">
              <div className="avatar">
                <img alt="Avatar" height="31" src="/static/avatar-icon.svg" width="24" />
              </div>
              <Chevron alt="Select" height="9" width="16" />
              <div className="temporary-dropdown">
                <button onClick={(e) => toogleAuth(e)} style={{fontSize: 16}}>
                  {user ? 'Sair' : 'Entrar'}
                </button>
              </div>
            </div>

            {/* gad logo */}
            <a className="signature d-none d-md-inline" href="http://somosgad.com" target="_blank">
              <img alt="GAD_" height="36" src="/static/gad-logo.svg" width="66" />
            </a>
          </>
        ) }

      </nav>
      <style jsx>{`
        .header {
          color: var(--gray);
          font-family: 'Helvetica', sans-serif;
          font-size: 21.5px;
          font-weight: bold;
          padding: 20px 45px;
          position: fixed;
          transition: background-color .2s;
          width: 100%;
          z-index: 10;
        }
        .header.closed {
          background-color: var(--black);
          position: static;
        }
        .header.scrolled {
          background-color: rgba(0, 0, 0, .57);
        }
        .nav {
          display: flex;
          align-items: center;
        }
        .header.closed .nav {
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
        .header.closed .logo {
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
        .menu a,
        .menu :global(.nav-link) {
          font-size: inherit;
          padding: 0;
          text-decoration: none;
          transition: color .2s;
        }
        .menu a:focus,
        .menu a:hover,
        .menu :global(.nav-link):focus,
        .menu :global(.nav-link):hover {
          color: #fff;
        }
        /* .menu :global(.dropdown-toggle::after) {
          border: 0;
        } */
        .menu :global(.dropdown-menu) {
          background-color: rgba(var(--gray3-rgb), .9);
          border: 0;
          border-radius: 0;
          color: inherit;
          font-size: inherit;
          left: 50% !important;
          margin-top: 37px;
          padding-top: 0;
          padding-bottom: 0;
          text-align: center;
          transform: translate3d(-50%, 32px, 0) !important;
        }
        .menu :global(.dropdown-item) {
          border: .1px solid transparent;
          box-shadow: 0 0 1px var(--black);
          color: inherit;
          font-weight: inherit;
          padding: .33rem 1rem;
          transition: color .2s;
        }
        .menu :global(.dropdown-item):focus,
        .menu :global(.dropdown-item):hover {
          background-color: transparent;
          color: var(--white);
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
          position: relative;
        }
        .user-select:hover .temporary-dropdown {
          display: block;
        }
        .temporary-dropdown {
          display: none;
          right: 0;
          padding-top: 15px;
          position: absolute;
          top: 100%;
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
    </header>
  )
}
export default Header
