import Link from 'next/link'
import { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import Chevron from '../icons/chevron'
import UserContext from '../../contexts/UserContext'
import { AuthModalContext } from '../../contexts/AuthModalContext'

export default ({}) => {

  const { signOut, user } = useContext(UserContext)
  const { closeAuthModal, openAuthModal } = useContext(AuthModalContext)

  const loggedMenu = [
    { slug: 'add', label: 'Mi Lista', href: '/wishlist' },
    { slug: 'user', label: 'Mi Cuenta', href: '/user/account' },
    // { slug: 'settings', label: 'Configuración', href: '/settings' },
    { slug: 'help', label: 'Ayuda', href: '/ayuda' },
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
    openAuthModal()
  }

  function logout(e) {
    e.preventDefault()
    signOut()
    closeAuthModal()
  }

  return (
    <div className={`user-select ${user ? 'logged' : ''}`}>

      <Dropdown alignRight drop="down" flip={undefined}>
        <Dropdown.Toggle id={`dropdown-custom-user`}>

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
        { user ? <>
          <Dropdown.Menu>

            <Dropdown.Header>
              <div className="user-name">{ getUserName() }</div>
              <div className="user-email">{ user.email }</div>
              <div className="suscriptor">Suscriptor</div>
            </Dropdown.Header>

            { loggedMenu.map((item, key) => (
              <Link href={item.href} key={key} passHref>
                <Dropdown.Item className="dropdown-item-style3" onClick={item.onClick}>
                  <span className="icon">
                    <img className={`img-fluid ${item.slug}`} src={`/static/icons/${item.slug}.svg`} />
                  </span>
                  <span>{item.label}</span>
                </Dropdown.Item>
              </Link>
            )) }

          </Dropdown.Menu>

        {/* public menu */}
        </> : (
          <Dropdown.Menu>

            <Dropdown.Item as="button"
              className="dropdown-item-style1"
              onClick={enter}>Entrar</Dropdown.Item>

            <Link href="/subscriptor">
              <Dropdown.Item className="dropdown-item-style2"
                href="/subscriptor">Suscripción</Dropdown.Item>
            </Link>

            <Dropdown.Divider />

            {/* <Dropdown.Item className="dropdown-item-style3" href="/ajustes">
              <span className="icon">
                <img height="26" src="/static/icons/settings.svg" width="26" />
              </span>
              <span>Ajustes</span>
            </Dropdown.Item> */}

            <Dropdown.Item className="dropdown-item-style3" href="/ayuda">
              <span className="icon">
                <img height="24" src="/static/icons/help.svg" width="24" />
              </span>
              <span>Ayuda</span>
            </Dropdown.Item>

          </Dropdown.Menu>
        ) }

      </Dropdown>

      {/* styles */}
      <style jsx>{`
        .user-select {
          align-items: center;
          display: flex;
          position: relative;
        }
        @media (min-width: 768px) {
          .user-select {
            margin-right: -15px;
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
        .user-select :global(.dropdown-toggle) :global(.chevron) {
          line-height: 1;
        }
        .user-select :global(.dropdown-toggle) :global(.chevron) :global(path) {
          fill: var(--gray);
        }
        .user-select :global(.dropdown-toggle)::after {
          display: none;
        }
        .user-select :global(.dropdown-toggle):focus :global(.chevron) :global(path),
        .user-select :global(.dropdown-toggle):hover :global(.chevron) :global(path) {
          fill: var(--white);
        }
        .user-select :global(.dropdown-menu) {
          background-color: var(--gray2);
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
          border-bottom: 12px solid var(--gray2);
          bottom: 100%;
          content: '';
          display: block;
          position: absolute;
          right: 10px;
        }
        .user-select :global(.dropdown-item) {
          color: var(--white);
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
          background-color: var(--gray3);
        }

        /* item style 3 */

        .user-select :global(.dropdown-item-style3) {
          background-color: var(--gray3);
          color: var(--light-gray);
          padding: 10px 30px;
          transition: background-color .2s;
        }
        .user-select :global(.dropdown-item-style3) .icon {
          display: inline-block;
          margin-right: 15px;
          vertical-align: middle;
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
          background-color: var(--gray3-darken);
        }

        /* logged styles */

        .user-select.logged :global(.dropdown-menu) {
          background-color: var(--gray3);
          padding-top: 0;
          padding-bottom: 5px;
        }
        .user-select.logged :global(.dropdown-menu)::before {
          border-bottom-color: var(--primary);
        }
        .user-select.logged :global(.dropdown-header) {
          background-color: var(--primary);
          border-radius: 5px;
          color: var(--white);
          line-height: 1;
          padding: 15px 30px;
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
          margin-bottom: 30px;
        }
        .user-select.logged :global(.dropdown-header) .suscriptor {
          color: var(--black);
          font-family: var(--sans-serif-condensed);
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

const Avatar = ({ image }) => {
  return (
    <span className="avatar">
      { ! image ? (
        <span className="empty-img">
          <img alt="Avatar" className="img-fluid" height="20" src="/static/icons/user.svg" width="20" />
        </span>
      ) : (
        <img alt="Avatar" className="img-fluid" height="30" src={image} width="30" />
      )}
      <style jsx>{`
        .avatar {
          background-clip: padding-box;
          background-color: var(--white);
          border-radius: 50%;
          height: 30px;
          margin: 2.5px;
          overflow: hidden;
          width: 30px;
        }
        .empty-img {
          align-items: center;
          display: flex;
          height: 100%;
          justify-content: center;
          padding: 17.5%;
          width: 100%;
        }
        .empty-img img {
          max-height: 100%;
          filter: brightness(0) saturate(100%);
        }
        @media (min-width: 768px) {
          .avatar {
            background-color: var(--gray);
            height: 38px;
            margin-right: 10px;
            width: 38px;
          }
        }
      `}</style>
    </span>
  )
}
