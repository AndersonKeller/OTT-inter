import Color from 'color'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { GoSearch } from 'react-icons/go';
import styled, { ThemeContext } from 'styled-components'
import AppLogo from '~/components/AppLogo'
import { CONFIG } from '~/config'
import { TENANT }  from '~/constants/constants'
import SearchContext from '~/contexts/SearchContext'
import ActiveLink from '../ActiveLink'
import ClubLogo from '../ClubLogo'
import DesktopMenu from './DesktopMenu'
import UserMenu from './UserMenu'

const StyledHeader = styled.header`
  background-color: ${props => props.closed ? 'var(--background)' :
    props.scrolled ? Color(props.theme.colors.background).fade(.1).string() :
    props.layoutColor === 'white' ? props.theme.colors.background : 'transparent'};
  box-shadow: 0 0 5px rgba(var(--black-rgb), ${props => props.layoutColor !== 'white' && props.scrolled ? '.9' : '0' });
  color: ${props => props.theme.colors.texts};
  font-family: var(--sans-serif);
  font-size: 16px;
  font-weight: bold;
  min-width: 100%;
  padding: 10px;
  position: ${props => props.closed ? 'static' : 'fixed'};
  transition: ${props => props.closed ? 'background-color .3s, box-shadow .3s' :
    'background-color .6s, box-shadow .6s'};
  width: 90%;
  z-index: 10;
  @media (min-width: 768px) {
    padding: 10px 30px;
  }
`

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

  const router = useRouter()
  const searchField = useRef(null)
  const { setSearch } = useContext(SearchContext)
  const [ searchFieldValue, setSearchFieldValue ] = useState('')

  function handleSearchBtnFocus(e) {
    e.preventDefault()
    searchField.current.focus()
  }

  function handleSearchBtnClick(e) {
    if (!searchFieldValue) {
      e.preventDefault()
    }
  }

  function handleSearchFieldChange(e) {
    setSearchFieldValue(e.target.value)
    /* optional: */
    // setSearch(e.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    setSearch(searchFieldValue)
    setSearchFieldValue('')
    if (router.pathname !== '/movies') {
      router.push('/movies')
    }
  }

  const theme = useContext(ThemeContext)
  const whiteColor = theme.colors.white
  const lightColor = theme.colors.texts

  return (
    <StyledHeader closed={closed} layoutColor={layoutColor} scrolled={scrolled}>
      <nav className="nav">

        {/* club logo */}
        { ! closed && (
          <HeaderClubLogo />
        ) }

        {/* logo */}
        <HeaderAppLogo closed={closed} />

        { ! closed && (
          <>
            {/* menu */}
            <DesktopMenu data={menus} />

            {/* form */}
            <form
              action="/movies"
              className="d-none d-lg-block search-form"
              method="get"
              onSubmit={handleSearchSubmit}
            >
              <button
                className="search-btn"
                id="search-btn"
                onClick={handleSearchBtnClick}
                onFocus={handleSearchBtnFocus}
                type="submit"
              >
                <GoSearch color="inherit" size={28} title="Buscar" />
              </button>
              <input
                className="form-control"
                id="search"
                name="search"
                onChange={handleSearchFieldChange}
                placeholder="Buscar"
                ref={searchField}
                type="search"
                value={searchFieldValue}
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
        .nav {
          display: flex;
          align-items: center;
          justify-content: ${closed ? 'center' : 'space-between'};
        }
        .form-control {
          background-color: transparent;
          border: 0;
          display: inline-block;
          color: ${whiteColor};
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          outline: 0;
          padding: 0;
          transition: ease .6s;
          vertical-align: middle;
          width: 0;
        }
        .form-control:focus {
          box-shadow: 0 0 0 .1rem var(--primary);
          margin-right: 10px;
          padding: 0 10px;
          width: 15vw;
        }
        .form-control::placeholder {
          color: ${lightColor};
        }
        .search-form {
          margin-left: auto;
        }
        .search-btn {
          background-color: transparent;
          border: 0;
          color: ${lightColor};
          cursor: pointer;
          margin-right: 10px;
          outline: 0;
          padding: 5px;
          vertical-align: middle;
        }
        .search-btn :global(svg) {
          transition: color .2s;
        }
        .search-btn:focus,
        .search-btn:hover {
          color: var(--white);
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
    </StyledHeader>
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

const HeaderAppLogo = ({ closed }) => {
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
            margin-right: ${closed ? 0 : '20px'};
          }
        }
      `}</style>
    </h1>
  )
}

export default Header
