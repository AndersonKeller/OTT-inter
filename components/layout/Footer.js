import Color from 'color'
import classNames from 'classnames'
import Link from 'next/link'
import React, { useContext } from 'react'
import { IconContext } from 'react-icons'
import { FaFacebookSquare } from 'react-icons/fa'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'
import ReactSVG from 'react-svg'
import { CONFIG } from '../../config'
import UserContext from '../../contexts/UserContext'
import ActiveLink from '../ActiveLink'
import { WHITE } from '~/constants/colors'
import { ThemeContext } from 'styled-components'
import packageJson from '~/package.json'

export default function Footer({ apiVersion, layoutColor }) {
  return (
    <footer className="footer">
      <NavFooter className="d-lg-none" />
      <TermsAndPoliciesBar apiVersion={apiVersion} layoutColor={layoutColor} />
      <style jsx>{`
        .footer {
          padding-bottom: 65px;
        }
        @media (min-width: 768px) {
          .footer {
            padding-bottom: 0;
          }
        }
      `}</style>
    </footer>
  )
}

const NavFooter = ({ className }) => {

  const { user } = useContext(UserContext)
  const menu = [
    { icon: 'home', label: 'Inicio', href: '/', },
    // { icon: 'live', label: 'Ahora', },
    { icon: 'categories', label: 'Categorías', href: '/categories', },
    // { icon: 'downloads', label: 'Descargas', href: '/downloads', },
    { icon: 'add', label: 'Mi Lista', href: user ? '/wishlist' : '/login', },
    { icon: 'search', label: 'Buscar', href: '/movies', },
    // { icon: 'scan', label: 'Escanear', },
  ]
  const classes = classNames('nav-footer', className)
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background).hsl().string()
  const textAndFillColor = Color(theme.colors.texts).hsl().string()

  return (
    <nav className={classes}>
      {menu.map((item, key) => (
        <ActiveLink href={item.href} {...{ key }}>
          <a>
            <span className="icon">
              <ReactSVG src={`/static/icons/${item.icon}.svg`} />
            </span>
            {item.label}
          </a>
        </ActiveLink>
      ))}
      <style jsx>{`
        .nav-footer {
          align-items: flex-end;
          background-color: ${backgroundColor};
          bottom: 0;
          box-shadow: 0 0 5px rgba(var(--black-rgb), .9);
          display: flex;
          /* font-size: 10px; */
          font-size: 13px;
          justify-content: space-evenly;
          left: 0;
          line-height: 20px;
          padding: 10px;
          position: fixed;
          z-index: 10;
          width: 100%;
        }
        .nav-footer a {
          align-items: center;
          color: ${textAndFillColor};
          display: flex;
          flex-direction: column;
          fill: ${textAndFillColor};
          text-decoration: none;
        }
        .nav-footer a.active {
          color: var(--white);
          fill: var(--white);
        }
        .nav-footer a .icon {
          margin-bottom: 5px;
          width: 20px;
        }
        .nav-footer a .icon :global(path),
        .nav-footer a .icon :global(polygon),
        .nav-footer a .icon :global(rect) {
          fill: inherit;
        }
      `}</style>
    </nav>
  )
}

const SocialNetworks = ({ className }) => {
  if (!CONFIG.socialNetworks && Array.isArray(CONFIG.socialNetworks)) {
    return
  }
  const theme = useContext(ThemeContext)
  const color = Color(theme.colors.backgroundContrast2).hsl().string()
  const colorHover = Color(theme.colors.white).hsl().string()
  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <ul className={`list-inline ${className} `}>
        {CONFIG.socialNetworks.map((item, key) => {
          const slug = item.name.toLowerCase()
          if (!['facebook', 'instagram', 'twitter'].includes(slug)) return
          return (
            <li key={key}>
              <a href={item.link} target="_blank" title={`${CONFIG.clubName} ${item.name}`}>
                {slug === 'facebook' ?
                  <FaFacebookSquare />
                  : slug === 'instagram' ?
                    <IoLogoInstagram />
                    : slug === 'twitter' &&
                    <IoLogoTwitter />
                }
              </a>

            </li>

          )
        })}
      </ul>
      <div className="logo-gad" ><GADLogo /></div>

      <style jsx>{`
       @media (max-width: 768px) {
        .logo-gad {
        padding-left:38px;
       }
      }
        .logo-gad {
          display:none;

        }
        ul {
          display: inline-flex;
          justify-content: center;
          margin: 5px 0;
        }
        a {
          color: ${color};
          display: block;
          padding: 2.5px;
          transition: color .3s;
        }

          a {
            margin-right: 1px;
            margin-left: 1px;
            padding: 5px;
          }
        }
        a:focus,
        a:hover {
          color: ${colorHover};
          transition: color .125s;
        }
      `}</style>
    </IconContext.Provider>
  )
}

const TermsAndPoliciesBar = ({ apiVersion, layoutColor }) => {
  const { appName } = CONFIG
  const { version: appVersion } = packageJson
  const showVersions = true
  const versionsLine = showVersions ? `v${appVersion}` + (apiVersion ? ` (api ${apiVersion})` : '') : ''
  const theme = useContext(ThemeContext)
  const color = Color(theme.colors.texts).hsl().string()
  return (
    <div className="terms-and-policies-bar">
      <div className="desktop container-fluid">
        <div className="row align-items-center w-100">

          <div className="col-12 col-sm-4 text-md-left">
            <p>{`${appName} @ 2020 - Todos los derechos reservados`}</p>
          </div>

          {/* social icons */}
          <div className="col-4 col-md-4 text-md-center terms-and-policies-bar__social-networks-col">
            <SocialNetworks className="social-networks" />
          </div>

          <div className="col-8 col-sm-4 text-md-right aling">
            <ul>

              {/* privacy policy */}
              <li><Link href="/privacy" passHref>
                <FooterLink>Política de Privacidad</FooterLink>
              </Link></li>

              {/* terms of use */}
              <li><Link href="/terminos-y-politicas" passHref>
                <FooterLink>Términos y políticas</FooterLink>
              </Link></li>

              <li className="logo-gad"><GADLogo /></li>

            </ul>
          </div>
        </div>
      </div>
      <div className="container-fluid mobile">
        <div className="row align-items-center">

          <div className="copyright col-12 text-center">
            <p>{`${appName} @ 2020`}</p>
            <p>Todos los derechos reservados</p>
          </div>

          <div className="links col-12">
            <ul>
              <li><Link href="/privacy" passHref>
                <FooterLink>Política de Privacidad</FooterLink>
              </Link></li>
              <li><Link href="/terminos-y-politicas" passHref>
                <FooterLink>Términos y políticas</FooterLink>
              </Link></li>
            </ul>
          </div>
          <div className="col-12 text-center terms-and-policies-bar__social-networks-col">
            <SocialNetworks className="social-networks" />
          </div>

          <div className="gad-logo col-12 text-center">
            <GADLogo />
          </div>

        </div>
      </div>
      <style jsx>{`

        .terms-and-policies-bar {
          background-color: ${layoutColor === 'white' ? 'var(--background)' : 'transparent'};
          color: ${color};
          font-size: 11px;
          line-height: 1;
          padding-top: 10px;
          padding-bottom: 5px;
        }
        
        .terms-and-policies-bar .mobile {
          display: none;
        }
        
        .terms-and-policies-bar .desktop {
          display: flex;
        }
        
        @media (max-width: 767px) {
        
          .terms-and-policies-bar .mobile {
            display: flex;
          }
          .terms-and-policies-bar .desktop {
            display: none;
          }
          
          .gad-logo {
            margin: 15px 0;
          }
          
          .copyright {
            margin-top: 15px;
          }
          
          .links {
            margin: 10px 0;
            display: flex;
            justify-content: center;
          }
          
          .aling {
            margin-top: -10px;
          }
          .logo-gad {
            display:none!important;
          }
          .terms-and-policies-bar__social-networks-col {
            padding-right: 0;
          }
          .terms-and-policies-bar__social-networks-col :global(.social-networks) {
            margin-left: -2.5px;
          }
        }
        .terms-and-policies-bar p {
          margin-bottom: 5px;
        }
        .terms-and-policies-bar ul {
          align-items: flex-start;
          display: flex;
          justify-content: space-between;
          list-style-type: none;
          margin-right: -5px;
          margin-bottom: 0;
          margin-left: -5px;
          padding-left: 0;
        }
        .terms-and-policies-bar ul li {
          display: inline;
          padding-right: 5px;
          padding-left: 5px;
        }
        .terms-and-policies-bar ul li:last-child {
          margin-left: auto;
        }
        @media (min-width: 768px) {
          .terms-and-policies-bar {
            font-size: 12px;
            line-height: 1.25;
            padding: 15px 5px;
          }
          .terms-and-policies-bar p {
            margin-bottom: 0;
          }
          .terms-and-policies-bar ul {
            align-items: center;
            justify-content: flex-end;
            margin-right: -10px;
          }
          .terms-and-policies-bar ul li {
            padding-right: 10px;
            padding-left: 10px;
          }
          .terms-and-policies-bar ul li:last-child {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

const FooterLink = React.forwardRef(({ children, onClick, href, target }, ref) => {
  const theme = useContext(ThemeContext)
  const color = Color(theme.colors.texts).hsl().string()
  const colorHover = Color(theme.colors.white).hsl().string()
  return <>
    <a {...{ href, onClick, ref, target }}>{children}</a>
    <style jsx>{`
      a {
        color: ${color};
        display: inline-block;
        text-decoration: none;
        transition: color .2s;
      }
      a::after {
        border-bottom: 1px solid ${colorHover};
        content: '';
        display: block;
        opacity: 0;
        transition: opacity .2s, transform .2s;
        transform: translateY(-2px);
      }
      a:focus,
      a:hover {
        color: ${colorHover};
      }
      a:focus::after,
      a:hover::after {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  </>
})

const GADLogo = _ => {
  return <>
    <a className="signature d-inline-block" href="//somosgad.com" target="_blank">
      <img alt="GAD_" height="19" src="/static/logos/gad.svg" width="35" />
    </a>
    <style jsx>{`
      img {
        height: 17px;
        min-width: 30px;
      }
      @media (min-width: 768px) {
        img {
          height: 19px;
          min-width: 35px;
        }
      }
    `}</style>
  </>
}
// display: grid;
// flex - wrap: nowrap;
// grid - template - columns: 35px 27px;
