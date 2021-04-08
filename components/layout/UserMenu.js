import Color from 'color'
import Link from 'next/link'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { GoPerson } from 'react-icons/go';
import { IoMdAddCircle, IoIosHelpCircle } from 'react-icons/io';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import ReactSVG from 'react-svg'
import { ThemeContext } from 'styled-components'
import UserContext from '~/contexts/UserContext'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import * as gtag from '~/lib/gtag'
import Chevron from '../icons/chevron'
import { TENANT } from "~/constants/constants";

const UserMenu = () => {

  const { signOut, user } = useContext(UserContext)
  const { closeAuthModal, openAuthModal } = useContext(AuthModalContext)

  const loggedMenu = [
    { slug: 'add', label: 'Mi Lista', href: '/wishlist' },
    { slug: 'user', label: 'Mi Cuenta', href: '/user/account' },
    // { slug: 'settings', label: 'Configuración', href: '/settings' },
    { slug: 'help', label: 'Ayuda', href: '/help' },
    // { slug: 'info', label: 'Soporte', href: '/soporte' },
    { slug: 'logout', label: 'Salir', href: '/logout', onClick: logout, },
  ]

  function getUserName() {
    const nameArray = user.name.split(' ')
    const userName = nameArray.length > 1 ?
      `${nameArray[0]} ${nameArray[nameArray.length - 1]}` : nameArray.join('')
    return userName
  }

  function enter(e) {
    e.preventDefault()
    // this is just a test, we should change it later:
    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: 'Message here',
    })
    openAuthModal()
  }

  function logout(e) {
    e.preventDefault()
    signOut()
    closeAuthModal()
  }

  const theme = useContext(ThemeContext)
  const backgroundColor1 = theme.colors.backgroundContrast2
  const backgroundColor2 = theme.colors.backgroundContrast
  const backgroundColor2Hover = Color(backgroundColor2).darken(.2).hsl().string()
  const blackColor = Color(theme.colors.black)
  const shadowColor = blackColor.fade(.7).hsl().string()
  const lightColor = theme.colors.texts
  const whiteColor = theme.colors.white

  return (
    <div className={`user-select ${user ? 'logged' : ''}`}>

      <Dropdown alignRight drop="down" flip={undefined}>

        <Dropdown.Toggle id="dropdown-custom-user">
          <Avatar image={user && user.cropped_image_url ? user.cropped_image_url : null} />
          <Chevron
            alt=""
            className="chevron d-none d-md-inline"
            dir="bottom"
            height="9"
            inline
            width="16"
          />
        </Dropdown.Toggle>

        {/* logged menu */}
        {user ? <>
          <Dropdown.Menu>
            <Dropdown.Header>
              <div className="user-name">{getUserName()}</div>
              <div className="user-email">{user.email}</div>
            </Dropdown.Header>
            {loggedMenu.map(({ href, label, onClick, slug }, key) => (
              <Link href={href} key={key} passHref>
                <Dropdown.Item className="dropdown-item-style3" onClick={onClick}>
                  <span className="icon">
                    {slug === 'add' ? (
                      <IoMdAddCircle size={24} />
                    ) : slug === 'help' ? (
                      <IoIosHelpCircle size={24} />
                    ) : slug === 'user' ? (
                      <GoPerson size={24} />
                    ) : slug === 'logout' ? (
                      <RiLogoutBoxRLine size={24} />
                    ) : (
                              <img className={`img-fluid ${slug}`} src={`/static/icons/${slug}.svg`} />
                            )}
                  </span>
                  <span>{label}</span>
                </Dropdown.Item>
              </Link>
            ))}
          </Dropdown.Menu>

          {/* public menu */}
        </> : (
            <Dropdown.Menu>
              <Dropdown.Item as="button"
                className="dropdown-item-style1"
                onClick={enter}>Entrar</Dropdown.Item>
              <Link  href={TENANT === 'lau' ? "/subscriptor" : "/signup"}>
                <Dropdown.Item className="dropdown-item-style2"
                  href="/signup">Suscripción</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              {/* <Dropdown.Item className="dropdown-item-style3" href="/ajustes">
              <span className="icon">
                <img height="26" src="/static/icons/settings.svg" width="26" />
              </span>
              <span>Ajustes</span>
            </Dropdown.Item> */}
              <Dropdown.Item className="dropdown-item-style3" href="/help">
                <span className="icon">
                  <IoIosHelpCircle size={24} />
                </span>
                <span>Ayuda</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          )}

      </Dropdown>

      <style jsx>{`
        .user-select {
          align-items: center;
          display: flex;
          position: relative;

        }
        @media(max-width:768px) {
              .user-select {
                margin-left:auto!important;
          }
        }
        .user-select :global(.dropdown-toggle) {
          align-items: center;
          background-color: transparent !important;
          border: 0;
          box-shadow: none !important;
          display: flex;
          padding: 5px;
        }
        @media (min-width: 768px) {
          .user-select :global(.dropdown-toggle) {
            padding-right: 15px;
            padding-left: 15px;
          }
        }
        .user-select :global(.dropdown-toggle)::after {
          display: none;
        }
        .user-select :global(.dropdown-toggle) :global(.avatar) {
          background-color: #FFF;
        }
        .user-select :global(.dropdown-toggle) :global(.chevron) {
          line-height: 1;
        }
        .user-select :global(.dropdown-toggle) :global(.chevron) :global(path) {
          fill: #FFF;
          transition: ease .2s;
        }
        .user-select :global(.dropdown-toggle):focus :global(.avatar),
        .user-select :global(.dropdown-toggle):hover :global(.avatar) {
          background-color: ${whiteColor};
          transition: background-color .2s;
        }
        .user-select :global(.dropdown-toggle):focus :global(.chevron) :global(path),
        .user-select :global(.dropdown-toggle):hover :global(.chevron) :global(path) {
          fill: ${whiteColor};
        }
        .user-select :global(.dropdown-menu) {
          background-color: #808080;
          box-shadow: 0 2px 5px ${shadowColor};
          border: 0;
          border-radius: 5px;
          margin-top: 5px;
          max-width: unset;
          padding-top: 5px;
          padding-bottom: 0;
        }
        .user-select :global(.dropdown-menu)::before {
          border: 13px solid transparent;
          border-top: 0;
          border-bottom: 12px solid ${backgroundColor1};
          bottom: 100%;
          content: '';
          display: block;
          position: absolute;
          right: 10px;
        }
        .user-select :global(.dropdown-item) {
          color: ${whiteColor};
        }
        .user-select :global(.dropdown-item):focus,
        .user-select :global(.dropdown-item):hover {
          background-color: transparent;
        }
        .user-select :global(.dropdown-item-style1) {
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 10px;
          outline: 0;
          text-align: center;
          transition: background-color .2s;
        }
        .user-select :global(.dropdown-item-style1):focus,
        .user-select :global(.dropdown-item-style1):hover {
          background-color: rgba(var(--black-rgb), .2);
        }
        .user-select :global(.dropdown-item-style2) {
          background-color: var(--primary);
          border-radius: 5px;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.25;
          margin: 10px 15px 15px;
          padding-right: 25px;
          padding-left: 25px;
          text-align: center;
          transition: background-color .2s;
          width: auto;
        }
        .user-select :global(.dropdown-item-style2):focus,
        .user-select :global(.dropdown-item-style2):hover {
          background-color: var(--primary-hover);
        }
        .user-select :global(.dropdown-divider) {
          border-top: 0;
          margin-bottom: 0;
        }
        .user-select :global(.dropdown-divider) ~ :global(.dropdown-item) {
          background-color: #333333;
        }

        /* item style 3 */

        .user-select :global(.dropdown-item-style3) {
          background-color: ${backgroundColor2};
          color: ${lightColor};
          padding: 7.5px 25px;
          transition: background-color .2s, color .2s;
          vertical-align: middle;
        }
        .user-select :global(.dropdown-item-style3) > span {
          vertical-align: middle;
        }
        .user-select :global(.dropdown-item-style3) .icon {
          display: inline-block;
          margin-right: 15px;
          width: 30px;
        }
        .user-select :global(.dropdown-item-style3) .icon img {
          margin-right: auto;
          margin-left: auto;
        }
        .user-select :global(.dropdown-item-style3) .icon .add {
          height: 20px;
          width: 20px;
        }
        .user-select :global(.dropdown-item-style3) .icon .user {
          height: 20px;
          width: 15px;
        }
        .user-select :global(.dropdown-item-style3) .icon .settings {
          height: 26px;
          width: 26px;
        }
        .user-select :global(.dropdown-item-style3) .icon .help {
          height: 24px;
          width: 24px;
        }
        .user-select :global(.dropdown-item-style3) .icon .info {
          height: 27px;
          width: 27px;
        }
        .user-select :global(.dropdown-item-style3) .icon .logout {
          height: 19px;
          width: 19px;
        }
        .user-select :global(.dropdown-item-style3):focus,
        .user-select :global(.dropdown-item-style3):hover {
          background-color: ${backgroundColor2Hover};
          color: ${whiteColor};
        }

        /* logged styles */

        .user-select.logged :global(.dropdown-menu) {
          background-color: ${backgroundColor2};
          box-shadow: 0 2px 5px ${shadowColor};
          padding-top: 0;
          padding-bottom: 5px;
        }
        .user-select.logged :global(.dropdown-menu)::before {
          border-bottom-color: var(--primary);
        }
        .user-select.logged :global(.dropdown-header) {
          background-color: var(--primary);
          border-radius: 5px;
          color: ${whiteColor};
          line-height: 1;
          padding: 15px 30px 20px;
          text-align: center;
        }
        .user-select.logged :global(.dropdown-header) .user-name {
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
          margin-bottom: 5px;
        }
        .user-select.logged :global(.dropdown-header) .user-email {
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}

const Avatar = ({ image }) => {
  const theme = useContext(ThemeContext)
  const avatarColor = theme.colors.background
  const lightColor = theme.colors.texts
  return (
    <span className={'avatar' + (!image ? ' avatar--empty' : '')}>
      {!image ? (
        <ReactSVG fallback="Avatar" src="/static/icons/user.svg" wrapper="span" />
      ) : (
          <img alt="Avatar" className="img-fluid" height="30" src={image} width="30" />
        )}
      <style jsx>{`
        .avatar {
          background-clip: padding-box;
          background-color: ${lightColor};
          border-radius: 50%;
          height: 30px;
          margin: 2.5px;
          overflow: hidden;
          transition: background-color .2s;
          width: 30px;
        }
        .avatar--empty > :global(span) {
          align-items: center;
          display: flex;
          justify-content: center;
          height: 100%;
          padding: 25%;
          width: 100%;
        }
        .avatar--empty :global(svg) {
          display: block;
          height: 100%;
          width: 100%;
        }
        .avatar--empty :global(path) {
          fill: ${avatarColor};
        }
        @media (min-width: 768px) {
          .avatar {
            height: 38px;
            margin-right: 10px;
            width: 38px;
          }
        }
      `}</style>
    </span>
  )
}

export default UserMenu;
