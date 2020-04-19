import React, { useContext, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Router from 'next/router'
import { CONFIG } from '~/config'
import { STATIC_PATH, TENANT }  from '~/constants/constants'
import UserMenu from './UserMenu'
import ActiveLink from '../ActiveLink'
import SearchContext from '~/contexts/SearchContext'
import DesktopMenu from './DesktopMenu'
import AppLogo from '~/components/AppLogo'
import ClubLogo from '../ClubLogo'

const Header = ({ closed, layoutColor, menus }) => {
  const hasWindow = typeof window !== 'undefined'

  // scrolled state
  const hasScrolled = _ => {
    return hasWindow ? window.pageYOffset > 1 : false
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
  }, [])

  // classes
  const classes = classNames('header', {
    closed: closed,
    scrolled: scrolled,
  })

  // submit
  // const [ searchValue, setSearchField ] = useState('')
  const { search, setSearch } = useContext(SearchContext)
  const searchRef = useRef(null)
  // const router = useRouter()
  const handleSearch = e => {
    e.preventDefault()
    Router.push('/movies')
  }

  return (
    <header className={classes}>
      <nav className="nav">

        {/* club logo */}
        { ! closed && (
          <HeaderClubLogo />
        ) }

        {/* logo */}
        <HeaderAppLogo />

        { ! closed && (
          <>
            {/* menu */}
            <DesktopMenu data={menus} />

            {/* form */}
            <form
              action="/movies"
              className="d-none d-lg-block search-form"
              method="get"
              onSubmit={handleSearch}
            >
              <button className="search-btn" id="search-btn" type="button" onClick={ _ => searchRef.current.focus() }>
                <img alt="Buscar" height="28" src="/static/magnify-icon.svg" width="28" />
              </button>
              <input
                className="form-control"
                ref={searchRef}
                // autoFocus={ router.pathname === '/movies'}
                name="search"
                id="search"
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar"
                type="search"
                value={search}
              />
            </form>

            {/* notifications */}
            {/* <button className="notifications-btn d-none d-md-inline-block" type="button">
              <img alt="Notificações" height="27" src="/static/notification-icon.svg" width="18" />
            </button> */}

            {/* user */}
            <UserMenu />

          </>
        ) }

      </nav>
      <style jsx>{`
        .header {
          background-color: ${layoutColor === 'white' ? 'var(--black)' : 'transparent'};
          box-shadow: 0 0 5px rgba(var(--black-rgb), 0);
          color: var(--gray);
          font-family: var(--sans-serif);
          /* font-size: 21.5px; */
          font-size: 16px;
          font-weight: bold;
          min-width: 100%;
          padding: 10px;
          position: fixed;
          transition: background-color .6s, box-shadow .6s;
          width: 90%;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .header {
            padding: 10px 30px;
          }
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
          justify-content: space-between;
        }
        .header.closed .nav {
          justify-content: center;
        }
        .header.closed :global(.logo) {
          margin-right: 0;
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
          width: 0;
          transition: ease-in-out 0.7s;
        }
        input[type=search]:focus {
          padding: 0px 10px;
          margin-right: 10px;
          width: 15vw;
          transition: ease-in-out 0.7s;
          box-shadow: 0 0 0 0.1rem var(--primary);
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
          margin-right: 10px;
          outline: 0;
          padding: 5px;
          vertical-align: middle;
        }
        .search-btn:hover {
          /* filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%); */
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

const HeaderClubLogo = _ => {
  return (
    <div className="club-logo">
      <Link href="/">
        <a>
          <ClubLogo alt={`by ${CONFIG.clubName}`} />
        </a>
      </Link>
      <style jsx>{`
        .club-logo {
          display: flex;
          height: 45px;
          padding: 5px;
          justify-content: center;
          width: 45px;
        }
        .club-logo a {
          display: flex;
        }
        @media (min-width: 768px) {
          .club-logo {
            height: 55px;
            margin-right: 5px;
            width: 55px;
          }
        }
      `}</style>
    </div>
  )
}

const HeaderAppLogo = _ => {
  return (
    <h1 className="logo">
      <ActiveLink href="/">
        <a>
          <AppLogo height={TENANT === 'lau' ? 30 : TENANT === 'river' ? 22 : 25} />
        </a>
      </ActiveLink>
      <style jsx>{`
        .logo {
          align-items: center;
          display: flex;
          justify-content: center;
          margin-top: -5px;
          margin-bottom: -5px;
        }
        .logo a {
          display: inline-flex;
          padding: 5px;
        }
        @media (min-width: 768px) {
          .logo {
            margin-right: 20px;
          }
        }
      `}</style>
    </h1>
  )
}

export default Header
