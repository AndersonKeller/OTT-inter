// react
import React from 'react'

// other imports
import classNames from 'classnames'
import Link from 'next/link'
import ReactSVG from 'react-svg'
import { useContext } from 'react'

// react icons
import { IconContext } from 'react-icons'
import { FaFacebookSquare } from 'react-icons/fa'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'

// app imports
import { CONFIG } from '../../config'
import UserContext from '../../contexts/UserContext'
import ActiveLink from '../ActiveLink'

// footer
export default function Footer({ layoutColor }) {
  return (
    <footer className="footer">
      <NavFooter className="d-md-none" />
      <TermsAndPoliciesBar {...{layoutColor}} />
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

// nav footer
const NavFooter = ({className}) => {

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
  return (
    <nav className={classes}>
      {menu.map((item, key) => (
        <ActiveLink href={item.href} {...{key}}>
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
          background-color: var(--black);
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
          color: var(--gray4);
          display: flex;
          flex-direction: column;
          fill: var(--gray4);
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

// social networks
const SocialNetworks = ({ className }) => {
  if ( ! CONFIG.socialNetworks && Array.isArray(CONFIG.socialNetworks) ) return
  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <ul className={`list-inline ${className}`}>
        { CONFIG.socialNetworks.map(item => {
          const slug = item.name.toLowerCase()
          if ( ! ['facebook', 'instagram', 'twitter'].includes(slug)) return
          return (
            <li>
              <a href={item.link} target="_blank" title={`${CONFIG.clubName} ${item.name}`}>
                { slug === 'facebook' ?
                  <FaFacebookSquare />
                : slug === 'instagram' ?
                  <IoLogoInstagram />
                : slug === 'twitter' &&
                  <IoLogoTwitter />
                }
              </a>
            </li>
          )
        }) }
      </ul>
      <style jsx>{`
        ul {
          display: inline-flex;
          justify-content: center;
          margin: 5px 0;
        }
        a {
          color: var(--gray3);
          display: block;
          padding: 2.5px;
          transition: color .3s;
        }
        @media (min-width: 768px) {
          a {
            margin-right: 1px;
            margin-left: 1px;
            padding: 5px;
          }
        }
        a:focus,
        a:hover {
          color: var(--white);
          transition: color .125s;
        }
      `}</style>
    </IconContext.Provider>
  )
}

// terms and policies
const TermsAndPoliciesBar = ({ layoutColor }) => {
  return (
    <div className="terms-and-policies-bar">
      <div className="container-fluid">
        <div className="row align-items-center">

          <div className="col-12 col-sm-4 text-md-left">
            <p>{CONFIG.appName} @ 2020 - Todos los derechos reservados</p>
          </div>

          {/* social icons */}
          <div className="col-4 col-md-4 text-md-center terms-and-policies-bar__social-networks-col">
            <SocialNetworks className="social-networks" />
          </div>

          <div className="col-8 col-sm-4 text-md-right">
            <ul>

              <li><Link href="/politica-de-privacidad" passHref>
                <FooterLink>Política de Privacidad</FooterLink>
              </Link></li>

              <li><Link href="/terminos-y-politicas" passHref>
                <FooterLink>Términos y políticas</FooterLink>
              </Link></li>

              <li><GADLogo /></li>

            </ul>
          </div>

        </div>
      </div>
      <style jsx>{`
        .terms-and-policies-bar {
          background-color: ${layoutColor === 'white' ? 'var(--black)' : 'transparent'};
          color: var(--gray4);
          font-size: 11px;
          line-height: 1;
          padding-top: 10px;
          padding-bottom: 5px;
        }
        @media (max-width: 767px) {
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

// footer link
const FooterLink = React.forwardRef(({ children, onClick, href, target }, ref) => {
  return <>
    <a {...{href, onClick, ref, target}}>{children}</a>
    <style jsx>{`
      a {
        color: inherit;
        display: inline-block;
        text-decoration: none;
        transition: color .2s;
      }
      a::after {
        border-bottom: 1px solid var(--white);
        content: '';
        display: block;
        opacity: 0;
        transition: opacity .2s, transform .2s;
        transform: translateY(-2px);
      }
      a:focus,
      a:hover {
        color: var(--white);
      }
      a:focus::after,
      a:hover::after {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  </>
})

// gad logo
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
