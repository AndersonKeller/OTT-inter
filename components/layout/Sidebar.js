import Color from 'color'
import Link from 'next/link'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ActiveLink from '~/components/ActiveLink'
import Chevron from '~/components/icons/chevron'
import UserContext from '~/contexts/UserContext'
import styled, { ThemeContext } from 'styled-components'
import { CONFIG } from '~/config'

const Sidebar = ({ data: menus, items }) => {

  function createMenuItem(menuItem) {
    let as_href, href

    if (menuItem.link_type_id === 1) {
      href = menuItem.link
    } else if (menuItem.link_type_id === 2) {
      href = '/category/[slug]'
      as_href = `/category/${ menuItem.category && menuItem.category.slug }`
    }
    return {
      as: as_href,
      href: href,
      label: menuItem.name,
      visibility: menuItem.private ? 'private' : 'public',
    }
  }

  const Aside = styled.div`
    width: 4rem;
    background-color: ${CONFIG?.sidebarColor} !important;
    /* float: left; */
    position: fixed;
    /* left: 200px; */
    /* bottom: 500px; */
    height: 100%;
    margin: 0;
    padding: 0;
    z-index: 123131312312;
  `;

  function isExternalLink(str) {
    return str && (str.startsWith('//') ||
      str.startsWith('http://') ||
      str.startsWith('https://') ||
      str.startsWith('www.'));
  }
  // const items = [
  //   ['mdi-soccer-field', 'link'],
  //   ['mdi-account', 'link'],
  //   ['sci-nav-dark.svg', 'link'],
  //   ['sci-user.svg', 'link']
  // ]


  let menu = []
  // if (menus) {
  //   items.map(menuItem => {
  //     let dropdown
  //     if (menuItem.children && menuItem.link_type_id === 3) {
  //       dropdown = []
  //       menuItem.children.map(item => {
  //         const submenuItem = createMenuItem(item)
  //         dropdown.push(submenuItem)
  //       })
  //     }
  //     let myItem = createMenuItem(menuItem)
  //     myItem = {
  //       dropdown: dropdown,
  //       ...myItem,
  //     }
  //     menu.push(myItem)
  //   });
  // }

  const { user } = useContext(UserContext)
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background)
  const submenuColor = Color(theme.colors.backgroundContrast).fade(.1).hsl().string()
  const submenuHoverColor = Color(theme.colors.backgroundContrast).darken(.3).fade(.1).hsl().string()
  const textsColor = theme.colors.texts

  return (
    <Aside className="d-flex flex-column flex-shrink-0 bg-light">
            <div className="nav-item" key="4">
        <a href="#" target="_blank">
          <img src={"/static/inter/inter-escudo.png" } style={{ width: '80px', marginTop: '20px', marginLeft:'20px' }} />
        </a>
      </div>
    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center" style={{marginTop: '30px'}}>
      {/* {['oi','tudo','bem'].map(p => <p>{p}</p>)} */}

      { items ?  items.map( (it, i) => { return (
                <>
                  <hr style={{border: '0.01rem solid gray', width: '100%'}} />
                  <li className="nav-item" key={`${i}`} style={{borderTop: '2px', backgroungColor: (i==1 ? 'red':'transparent') }}>
                    <a href={ it[1] } target="_blank">
                      <img src={`/static/inter/${it[0]}` } style={{ filter: 'invert(100%) sepia(0%) saturate(88%) hue-rotate(196deg) brightness(120%) contrast(100%)', width: '25px' }} />
                    </a>
                  </li>
                </>
                )}) 
            : (
        <>
        <div className="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem;">
    {/* <a href="/" className="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
      <svg className="bi" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span className="visually-hidden">Icon-only</span>
    </a>
    <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li className="nav-item">
        <a href="#" className="nav-link active py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
          <svg className="bi" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home"></use></svg>
        </a>
      </li>
      <li>
        <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
          <svg className="bi" width="24" height="24" role="img" aria-label="Dashboard"><use xlink:href="#speedometer2"></use></svg>
        </a>
      </li>
      <li>
        <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
          <svg className="bi" width="24" height="24" role="img" aria-label="Orders"><use xlink:href="#table"></use></svg>
        </a>
      </li>
      <li>
        <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
          <svg className="bi" width="24" height="24" role="img" aria-label="Products"><use xlink:href="#grid"></use></svg>
        </a>
      </li>
      <li>
        <a href="#" className="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
          <svg className="bi" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle"></use></svg>
        </a>
      </li>
    </ul>
    <div className="dropdown border-top">
      <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="mdo" width="24" height="24" className="rounded-circle" />
      </a>
      <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> */}
  </div>
  </>
  )}
      <style jsx>{ `
        .menu {
          display: none;
          justify-content: space-between;
          margin: 0 auto 0 0;
          padding-left: 0;
        }
        .menu li {
          display: flex;
        }
        .menu a,
        .menu :global(.dropdown-toggle) {
          background-color: transparent;
          border: 0;
          color: #FFF;
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
        .menu a,
        .menu :global(.dropdown-toggle):focus,
        .menu :global(.dropdown-toggle):hover {
          background-color: transparent;
          box-shadow: none !important;
          color: #fff;
          cursor: pointer;
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
          //fill: ${ textsColor };
          transition: fill .2s;
        }
        .menu :global(.dropdown-toggle):focus :global(.chevron) :global(path),
        .menu :global(.dropdown-toggle):hover :global(.chevron) :global(path) {
          fill: var(--white);
        }
        .menu :global(.dropdown-menu) {
          background-color: transparent;
          border: 0;
          border-radius: 0;
          color: #FFF;
          font-size: inherit;
          left: 50% !important;
          margin-top: 22px;
          padding-top: 0;
          padding-bottom: 0;
          text-align: center;
          transform: translate3d(-50%, 32px, 0) !important;
        }
        .menu :global(.dropdown-item) {
          background-color: ${ backgroundColor };
          border: .1px solid transparent;
          box-shadow: 0 0 1px var(--black);
          color: #FFF;
          font-weight: inherit;
          padding: .33rem 1rem;
          transition: background-color .2s, color .2s;
        }
        .menu :global(.dropdown-item):focus,
        .menu :global(.dropdown-item):hover {
          background-color: ${ submenuHoverColor };
        }
        .menu :global(.dropdown-item):focus,
        .menu :global(.dropdown-item):hover,
        .menu :global(.dropdown-item.active) {
          color: var(--white);
        }
        
        .rec-label {
        
          position: absolute;
          top: -17px;
          right: -15px;
   
          width: 10px;
          height: 10px;
          font-size: 0;
          background-color: red;
          border: 0;
          border-radius: 35px;
          margin: 18px;
          outline: none;
        }
        
        .notRec{
          background-color: darkred;
        }
        
        .Rec{
          animation-name: pulse;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        
        @keyframes pulse{
          0%{
          box-shadow: 0px 0px 5px 0px rgba(173,0,0,.3);
          }
          65%{
          box-shadow: 0px 0px 5px 7px rgba(173,0,0,.3);
          }
          90%{
          box-shadow: 0px 0px 5px 7px rgba(173,0,0,0);
          }
        }
      `}</style>
    </ul>
    </Aside>
  )
}

export default Sidebar
