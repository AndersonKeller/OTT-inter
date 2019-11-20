import classNames from 'classnames'
import Color from 'color'
import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { GRAY3 } from '../../constants/colors'
import { STATIC_PATH } from '../../constants/constants'
import ActiveLink from '../ActiveLink'
import UserContext from '../UserContext'
import Chevron from '../icons/chevron'
import UserMenu from './UserMenu'
import { CONFIG } from '../../config'
import Router from 'next/router'

const Header = ({ menus, closed, ...props }) => {

  function createMenuItem(menuItem) {
    // define href
    let as_href,
      href
    if (menuItem.link_type_id === 1) {
      href = menuItem.link
    } else if (menuItem.link_type_id === 2) {
      href = '/category/[slug]'
      as_href = `/category/${menuItem.category && menuItem.category.slug}`
    }
    return {
      as: as_href,
      href: href,
      label: menuItem.name,
      visibility: menuItem.private ? 'private' : 'public',
    }
  }

  // menu
  let menu = null
  if (menus) {
    menu = []
    menus.map(menuItem => {
      // create dropdown menus
      let dropdown
      if (menuItem.children && menuItem.link_type_id === 3) {
        dropdown = []
        menuItem.children.map(item => {
          const submenuItem = createMenuItem(item)
          dropdown.push(submenuItem)
        })
      }
      let myItem = createMenuItem(menuItem)
      myItem = {
        dropdown: dropdown,
        ...myItem,
      }
      menu.push(myItem)
    });
  }

  // user context
  const { user } = useContext(UserContext)

  // scrolled state
  const hasScrolled = _ => {
    return typeof window !== 'undefined' ? window.pageYOffset > 1 : false
  }
  const [ scrolled, setScrolled ] = useState(hasScrolled())
  useEffect(_ => {
    const handleScroll = _ => {
      setScrolled(hasScrolled())
    }
    window.addEventListener('scroll', handleScroll)
    return _ => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  // classes
  const classes = classNames('header', {
    closed: closed,
    scrolled: scrolled,
  })

  // submit
  const [ searchValue, setSearchField ] = useState('')
  const handleSearch = (e) => {
    e.preventDefault()
    Router.push({
      pathname: '/movies',
      query: { search: searchValue },
    })
  }

  return (
    <header className={classes}>
      <nav className="nav">

        {/* logo */}
        <h1 className="logo">
          <ActiveLink href="/">
            <a><img alt={CONFIG.appName} className="img-fluid" src={`${STATIC_PATH}/logos/dale.svg`} /></a>
          </ActiveLink>
        </h1>

        { ! closed && (
          <>

            {/* club logo */}
            <div className="club-logo">
              <a href={CONFIG.site} target="_blank">
                <img alt={`by ${CONFIG.clubName}`} className="img-fluid" src={`${STATIC_PATH}/logos/club.svg`} />
              </a>
            </div>

            {/* menu */}
            <ul className="menu d-none d-md-flex">
              { menu ? (
                <>
                  { menu.map(({ label, href, as, visibility, dropdown }, i) => {
                    return ( ! visibility ||
                      visibility === 'public' ||
                      visibility === 'publicOnly' && ! user ||
                      visibility === 'private' && user) && (
                      <li key={i}>
                        { dropdown && dropdown.length ? (
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
                                <ActiveLink as={as} href={href} key={k}>
                                  <Dropdown.Item href={as}>{label}</Dropdown.Item>
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
                </>
              ) : (
                <li>No se pueden cargar los menús</li>
              ) }
            </ul>

            {/* form */}
            <form
              action="/movies"
              className="d-none d-md-block search-form"
              method="get"
              onSubmit={(e) => handleSearch(e)}
            >
              <button className="search-btn" type="submit">
                <img alt="Buscar" height="28" src="/static/magnify-icon.svg" width="28" />
              </button>
              <input
                className="form-control"
                name="search"
                onChange={e => setSearchField(e.target.value)}
                placeholder="Buscar"
                type="search"
                value={searchValue}
              />
            </form>

            {/* notifications */}
            <button className="notifications-btn d-none d-md-inline-block" type="button">
              <img alt="Notificações" height="27" src="/static/notification-icon.svg" width="18" />
            </button>

            {/* user */}
            <UserMenu />

            {/* gad logo */}
            <a className="signature d-none d-md-inline" href="http://somosgad.com" target="_blank">
              <img alt="GAD_" height="19" src="/static/logos/gad.svg" width="35" />
            </a>

          </>
        ) }

      </nav>
      <style jsx>{`
        .header {
          box-shadow: 0 0 5px rgba(var(--black-rgb), 0);
          color: var(--gray);
          font-family: 'Helvetica', sans-serif;
          /* font-size: 21.5px; */
          font-size: 16px;
          font-weight: bold;
          min-width: 100%;
          padding: 15px 30px;
          padding-bottom: 20px;
          position: fixed;
          transition: background-color .6s, box-shadow .6s;
          width: 90%;
          z-index: 10;
        }
        .header.closed {
          background-color: var(--black);
          position: static;
        }
        .header.scrolled {
          background-color: rgba(var(--black-rgb), .9);
          box-shadow: 0 0 5px rgba(var(--black-rgb), .9);
          transition: background-color .3s, box-shadow .3s;
        }
        .nav {
          display: flex;
          align-items: center;
        }
        .header.closed .nav {
          justify-content: center;
        }
        .logo {
          display: flex;
          height: auto;
          justify-content: center;
          margin: -10px;
          margin-right: 30px;
          height: 75px;
          width: 130px;
        }
        .logo a {
          display: block;
          padding: 10px;
        }
        .header.closed .logo {
          margin-right: 0;
        }
        .club-logo {
          display: flex;
          height: 45px;
          justify-content: center;
          margin-right: 30px;
          width: 45px;
        }
        .club-logo a {
          display: flex;
        }
        .menu {
          display: none;
          justify-content: space-between;
          margin: 0 auto;
          margin-left: -15px;
          padding-left: 0;
        }
        .menu li {
          display: flex;
        }
        .menu a,
        .menu :global(.dropdown-toggle) {
          background-color: transparent;
          border: 0;
          color: inherit;
          display: block;
          font-size: inherit;
          font-weight: inherit;
          padding: 5px 10px;
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
        input[type=search] {
          padding: 0px 10px;
          margin-right: 10px;
          width: 10vw;
          transition: ease-in-out 0.7s;
        }
        input[type=search]:focus {
          width: 20vw !important;
          transition: ease-in-out 0.7s;
          box-shadow: 0 0 0 0.1rem rgba(255, 0, 0, 0.26);
        }
        .form-control::placeholder {
          color: #b2b2b2;
        }
        .search-form {
          margin-left: auto;
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
        .search-btn:hover {
          filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
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
