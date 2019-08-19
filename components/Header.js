import React from 'react'
import Link from 'next/link'
import ReactSVG from 'react-svg'

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

const Header = () => (
  <header>
    <nav>

      {/* logo */}
      <h1 className="logo">
        <Link href="/">
          <a><ReactSVG fallback="Dale Campeón" src="/static/logo.svg" /></a>
        </Link>
      </h1>

      {/* menu */}
      <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
      
      {/* form */}
      <form>
        <input placeholder="Buscar" type="search" />
      </form>

      <style jsx>{`
        .logo {
          width: 131px;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          text-decoration: none;
          font-size: 13px;
        }
      `}</style>
    </nav>
  </header>
)

export default Header
