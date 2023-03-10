import Color from 'color'
import Link from 'next/link'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ActiveLink from '~/components/ActiveLink'
import Chevron from '~/components/icons/chevron'
import UserContext from '~/contexts/UserContext'
import { ThemeContext } from 'styled-components'

const DesktopMenu = ({ data: menus }) => {

  function createMenuItem(menuItem) {
    let as_href,
      href
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

  function isExternalLink(str) {
    return str && (str.startsWith('//') ||
      str.startsWith('http://') ||
      str.startsWith('https://') ||
      str.startsWith('www.'));
  }

  let menu = null
  if (menus) {
    menu = []
    menus.map(menuItem => {
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

  const { user } = useContext(UserContext)
  const theme = useContext(ThemeContext)
  const backgroundColor = Color(theme.colors.background)
  const submenuColor = Color(theme.colors.backgroundContrast).fade(.1).hsl().string()
  const submenuHoverColor = Color(theme.colors.backgroundContrast).darken(.3).fade(.1).hsl().string()
  const textsColor = theme.colors.texts

  return (
    <ul className="menu d-none d-md-flex">
      { menu ? (
        <>
          { menu.map(({ as, dropdown, href, label, visibility }, i) => {
            return (!visibility ||
              visibility === 'public' ||
              visibility === 'publicOnly' && !user ||
              visibility === 'private' && user) && (
              <li key={ i }>
                { dropdown && dropdown.length ? (
                  <Dropdown>
                    <Dropdown.Toggle id={ `dropdown-custom-${ i }` }>
                      { label }
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
                      { dropdown.map(({ as: sub_as, href: sub_href, label: sub_label }, key) => (
                        isExternalLink(sub_href) ? (
                          <Dropdown.Item href={ sub_href } key={ key } target="_blank">{ sub_label }</Dropdown.Item>
                        ) : (
                          <Link as={ sub_as } href={ sub_href } key={ key } passHref>
                            <Dropdown.Item href={ sub_as }>{ sub_label }</Dropdown.Item>
                          </Link>
                        )
                      )) }
                    </Dropdown.Menu>
                  </Dropdown>
                ) : isExternalLink(href) ? (
                  <a href={ href } target="_blank">{ label }</a>
                ) : (
                  <ActiveLink as={ as } href={ href != null && href != "" ? href : "/" }>
                    <a>{ label }</a>
                  </ActiveLink>
                ) }
              </li>
            )
          }) }
          {/*<a href="/live" target="_blank" style={{"position": "relative"}}>Live <span className={"rec-label Rec"}></span></a>*/}
        </>
      ) : (
        <li>No se pueden cargar los men??s</li>
      ) }
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
  )
}

export default DesktopMenu
