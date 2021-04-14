import Color from 'color'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState, useRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
// import AppLogo from '~/components/AppLogo'
import { CONFIG } from '~/config'
import { TENANT } from '~/constants/constants'
import SearchContext from '~/contexts/SearchContext'
import LogoClub from '../LogoClub'
import UserMenu from '~/components/layout/UserMenu'
import LogoApp from '../LogoApp'
import {StyledHeader}  from './style'


const HeaderSubscription =
  ({ closed, layoutColor, menus, media }) => {
    const hasWindow = typeof window !== 'undefined'

    // scrolled state
    const hasScrolled = _ => {
      return hasWindow ? window.pageYOffset > 1 : false
    }

    const [scrolled, setScrolled] = useState(hasScrolled())
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
    const [searchFieldValue, setSearchFieldValue] = useState('')

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


      <StyledHeader closed={closed} layoutColor={layoutColor} scrolled={scrolled} media={media} >
        <nav className="nav">
          {/* club logo */}
          {(!closed && (TENANT !== 'lau')) && (
            <HeaderClubLogo />
          )}

          {/* logo */}
          <HeaderAppLogo closed={closed} media={media} />

          {!closed && (
              //  user
              <div className="menu-sub">
             <span className="menu-sub-text" >Ingresa aquí</span> <UserMenu  login_sub={true}/></div>
          )}




        </nav>

      </StyledHeader >
    )
  }

const HeaderClubLogo = _ => {
  return (
    <div className="club-logo">
      <Link href="/">
        <LogoClub />
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
            margin-right: 135px;;
            width: 55px;
          }
        }
      `}</style>
    </div>
  )
}

const HeaderAppLogo = ({ closed, media }) => {

  return (
    <h1 className="logo">
      <Link href={media && media.video_file ? `/media/${media.slug}/watch` : '/'} >
        <a>
          <LogoApp height={TENANT === 'lau' ? 30 : TENANT === 'river' ? 22 : 25} />
        </a>
      </Link>


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
            margin-right: ${closed ? 0 : '0px'};
          }
        }
      `}</style>
    </h1 >
  )
}



export default  HeaderSubscription

