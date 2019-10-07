import classNames from 'classnames'
import Color from 'color'
import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { APP_NAME, GRAY3, STATIC_SUFFIX } from '../../constants/constants'
import ActiveLink from '../ActiveLink'
import UserContext from '../UserContext'
import Chevron from '../icons/chevron'
import UserMenu from './UserMenu'

const Header = (props) => {

  // menu
  const menu = [
    { label: 'Home', href: '/' },
    { label: 'Videos', href: '/videos' },
    { label: 'Podcasts', href: '/podcasts' },
    { label: 'Entrevistas', href: '/entrevistas' },
    { label: 'Fotos', href: '/c/[slug]', as: '/c/fotos', visibility: 'publicOnly' },
    { label: 'Sorteos', href: '/c/[slug]', as: '/c/sorteos', visibility: 'publicOnly' },
    {
      label: 'Más',
      dropdown: [
        { label: 'Fotos', href: '/c/[slug]', as: '/c/fotos', },
        { label: 'Sorteos', href: '/c/[slug]', as: '/c/sorteos', },
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
  const { user } = useContext(UserContext)

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
          <ActiveLink href="/">
            <a><img alt={APP_NAME} className="img-fluid" height="44" src={`/static/${STATIC_SUFFIX}/logos/dale.svg`} width="90" /></a>
          </ActiveLink>
        </h1>

        { ! props.closed && (
          <>

            {/* club logo */}
            <div className="club-logo">
              <img alt="by River Plate" height="44" src={`/static/${STATIC_SUFFIX}/logos/club.svg`} width="35" />
            </div>

            {/* menu */}
            <ul className="menu d-none d-md-flex">
              { menu.map(({ label, href, as, visibility, dropdown }, i) => {
                return ( ! visibility ||
                  visibility === 'publicOnly' && ! user ||
                  visibility === 'private' && user) && (
                  <li key={i}>
                    { dropdown ? (
                      <Dropdown>
                        <Dropdown.Toggle id={`dropdown-custom-${i}`}>
                          {label}
                          <Chevron
                            alt=""
                            className="chevron"
                            dir="bottom"
                            height="9"
                            inline
                            width="16"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          { dropdown.map(({ label, href, as }, k) => (
                            <ActiveLink as={as} href={href}>
                              <Dropdown.Item href={as} key={k}>{label}</Dropdown.Item>
                            </ActiveLink>
                          )) }
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <ActiveLink as={as} href={href}>
                        <a>{label}</a>
                      </ActiveLink>
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
            <UserMenu />

            {/* gad logo */}
            <a className="signature d-none d-md-inline" href="http://somosgad.com" target="_blank">
              <img alt="GAD_" height="27" src="/static/logos/gad.svg" width="50" />
            </a>

          </>
        ) }

      </nav>
      <style jsx>{`
        .header {
          color: var(--gray);
          font-family: 'Helvetica', sans-serif;
          /* font-size: 21.5px; */
          font-size: 16px;
          font-weight: bold;
          padding: 10px 30px 10px 45px;
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
          min-height: 44px;
          width: 90px;
        }
        .header.closed .logo {
          margin-right: 0;
        }
        .club-logo {
          margin-right: 20px;
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
          padding: 5px 15px;
        }
        @media (min-width: 1367px) {
          .menu li {
            padding-right: 20px;
            padding-left: 20px;
          }
        }
        .menu a,
        .menu :global(.dropdown-toggle) {
          background-color: transparent;
          border: 0;
          color: inherit;
          display: block;
          font-size: inherit;
          font-weight: inherit;
          padding: 0;
          text-decoration: none;
          transition: color .2s;
        }
        .menu a:focus,
        .menu a:hover,
        .menu a.active,
        .menu :global(.dropdown-toggle):focus,
        .menu :global(.dropdown-toggle):hover {
          background-color: transparent;
          box-shadow: none !important;
          color: #fff;
        }
        .menu :global(.dropdown-toggle)::after {
          display: none;
        }
        .menu :global(.dropdown-toggle) :global(.chevron) {
          display: inline-block;
          line-height: 1;
          margin-left: 10px;
        }
        .menu :global(.dropdown-toggle) :global(.chevron) :global(path) {
          fill: var(--gray);
        }
        .menu :global(.dropdown-toggle):focus :global(.chevron) :global(path),
        .menu :global(.dropdown-toggle):hover :global(.chevron) :global(path) {
          fill: var(--white);
        }
        .menu :global(.dropdown-menu) {
          background-color: transparent;
          border: 0;
          border-radius: 0;
          color: inherit;
          font-size: inherit;
          left: 50% !important;
          margin-top: 22px;
          padding-top: 0;
          padding-bottom: 0;
          text-align: center;
          transform: translate3d(-50%, 32px, 0) !important;
        }
        .menu :global(.dropdown-item) {
          background-color: rgba(var(--gray3-rgb), .9);
          border: .1px solid transparent;
          box-shadow: 0 0 1px var(--black);
          color: inherit;
          font-weight: inherit;
          padding: .33rem 1rem;
          transition: background-color .2s, color .2s;
        }
        .menu :global(.dropdown-item):focus,
        .menu :global(.dropdown-item):hover {
          background-color: ${Color(GRAY3).darken(.3).fade(.1)};
        }
        .menu :global(.dropdown-item):focus,
        .menu :global(.dropdown-item):hover,
        .menu :global(.dropdown-item.active) {
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
          margin-right: 5px;
          outline: 0;
          padding: 5px;
          vertical-align: middle;
        }
        .notifications-btn {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          outline: 0;
          margin-right: 10px;
          padding: 5px;
          vertical-align: middle;
        }
      `}</style>
    </header>
  )
}

export default Header
