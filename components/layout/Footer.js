// other imports
import classNames from 'classnames'
import Link from 'next/link'
import ReactSVG from 'react-svg'

// app imports
import { CONFIG } from '../../config'
import ActiveLink from '../ActiveLink'

// footer
export default function Footer() {
  return (
    <footer className="footer">
      <NavFooter className="d-md-none" />
      <TermsAndPoliciesBar />
      <style jsx>{`
        .footer{
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
  const menu = [
    { icon: 'home', label: 'Inicio', href: '/', },
    // { icon: 'live', label: 'Ahora', },
    { icon: 'categories', label: 'Categorias', href: '/categories', },
    { icon: 'downloads', label: 'Descargas', href: '/downloads', },
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

// terms and policies
const TermsAndPoliciesBar = _ => {
  return (
    <div className="terms-and-policies-bar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div className="row">
              <div className="col-12 col-md-9 text-md-left">
                <p>{CONFIG.appName} @ 2019 <a href="//www.somosgad.com/" target="_blank">GAD_</a> - Todos los derechos reservados - <Link href="/politica-de-privacidad"><a>Política de Privacidad</a></Link></p>
              </div>
              <div className="col-12 col-md-3 text-md-right">
                <p><Link href="/terminos-y-politicas"><a>Términos y políticas</a></Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .terms-and-policies-bar {
          font-size: 13px;
          padding-top: 20px;
          padding-bottom: 20px;
          text-align: center;
        }
        .terms-and-policies-bar a {
          color: inherit;
          display: inline-block;
          text-decoration: none;
        }
        .terms-and-policies-bar a::after {
          border-bottom: 1px solid var(--white);
          content: '';
          display: block;
          opacity: 0;
          transition: opacity .2s, transform .2s;
          transform: translateY(-2px);
        }
        .terms-and-policies-bar a:focus::after,
        .terms-and-policies-bar a:hover::after {
          opacity: 1;
          transform: translateY(0);
        }
        @media (min-width: 768px) {
          .terms-and-policies-bar {
            padding-right: 5px;
            padding-left: 5px;
          }
          .terms-and-policies-bar p {
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  )
}
