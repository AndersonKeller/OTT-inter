import Link from 'next/link'
import { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'

import Chevron from '../icons/chevron'
import Button from '../button'
import UserContext from '../UserContext'

export default _ => {
  const { signIn, signOut, user } = useContext(UserContext)
  const toogleAuth = (e) => {
    e.preventDefault()
    if (user) {
      signOut()
    } else {
      const fakeUser = {
        name: 'Pablo Capriorni',
        email: 'pablocapriorni@gmail.com',
      }
      signIn(fakeUser)
    }
    handleClose()
  }
  const loggedMenu = [
    { slug: 'add', label: 'Mi Lista', href: '/mi-lista' },
    { slug: 'user', label: 'Mi Cuenta', href: '/mi-cuenta' },
    { slug: 'settings', label: 'Configuración', href: '/mi-cuenta' },
    { slug: 'help', label: 'Ayuda', href: '/ayuda' },
    { slug: 'info', label: 'Soporte', href: '/soporte' },
    { slug: 'logout', label: 'Salir', href: '/logout', onClick: toogleAuth, },
  ]
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div className={`user-select d-none d-md-flex ${user ? 'logged' : ''}`}>

      <Dropdown alignRight drop="down" flip={false}>
        <Dropdown.Toggle id={`dropdown-custom-user`}>
          <span className="avatar">
            <img alt="Avatar" height="31" src="/static/icons/user.svg" width="24" />
          </span>
          <Chevron
            alt=""
            className="chevron"
            dir="bottom"
            height="9"
            inline
            width="16"
          />
        </Dropdown.Toggle>
        { user ? (
          <Dropdown.Menu>
            <Dropdown.Header>
              <div className="user-name">{ user.name }</div>
              <div className="user-email">{ user.email }</div>
              <div className="suscriptor">Suscriptor</div>
            </Dropdown.Header>
            { loggedMenu.map((item, i) => (
              <Dropdown.Item className="dropdown-item-style3" href={item.href} key={i} onClick={item.onClick}>
                <span className="icon"><img className={`img-fluid ${item.slug}`} src={`/static/icons/${item.slug}.svg`} /></span>
                <span>{item.label}</span>
              </Dropdown.Item>
            )) }
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu>
            <Dropdown.Item as="button" className="dropdown-item-style1" onClick={handleShow}>Entrar</Dropdown.Item>
            <Link href="/subscriptor">
              <Dropdown.Item className="dropdown-item-style2" href="/subscriptor">Suscripción</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item className="dropdown-item-style3" href="/ajustes">
              <span className="icon">
                <img height="26" src="/static/icons/settings.svg" width="26" />
              </span>
              <span>Ajustes</span>
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-item-style3" href="/ayuda">
              <span className="icon">
                <img height="24" src="/static/icons/help.svg" width="24" />
              </span>
              <span>Ayuda</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        ) }
      </Dropdown>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <img alt="Dale Campeón" height="64" src="/static/logo.svg" width="131" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="intro-text">
            <p>Una sola cuenta para todos los productos RIVER PLATE</p>
          </div>
          <div className="form-group">
            <label for="email">E-mail</label>
            <input className="form-control" id="email" type="email" />
            <div className="form-text text-center">
              <a href="#">¿Olvidó su nombre de usuario?</a>
            </div>
          </div>
          <div className="form-group">
            <label for="clave">Clave</label>
            <input className="form-control" id="clave" type="password" />
            <div className="form-text text-center">
              <a href="#">¿Olvidó su clave?</a>
            </div>
          </div>
          <Button block className="enter-btn" onClick={toogleAuth} size="sm">Entrar</Button>
          <div className="already-subscriptor">¿Ya es suscriptor? <a className="bold text-uppercase" href="#" onClick={toogleAuth}>Haga Login</a></div>
          <div className="or-enter-with">o entre con</div>
          <Button onClick={toogleAuth}>Facebook</Button>
          <Button onClick={toogleAuth}>Google</Button>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        /* modal */
        :global(.modal-backdrop.show) {
          opacity: .68;
        }
        :global(.modal) {
          align-items: center;
          color: var(--gray4);
          padding-top: .5rem;
          padding-bottom: .5rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          :global(.modal) {
            padding-top: 1.75rem;
            padding-bottom: 1.75rem;
          }
        }
        :global(.modal-open) :global(.modal) {
          display: flex !important;
        }
        :global(.modal-dialog) {
          box-shadow: 0 2px 6px var(--black);
          margin-top: auto;
          margin-bottom: auto;
          max-width: 325px;
        }
        :global(.modal-content) {
          border: 0;
          border-radius: 0;
        }
        :global(.modal-header) {
          background-color: var(--dark-gray3);
          border-radius: 0;
          justify-content: center;
          padding: 10px;
          position: relative;
        }
        :global(.modal-header) :global(.close) {
          outline: 0;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }
        :global(.modal-body) {
          padding: 15px 25px 20px;
        }
        .intro-text {
          font-size: 18px;
          line-height: 1.2;
          margin-bottom: 5px;
          padding: 0 15%;
        }
        .intro-text *:last-child {
          margin-bottom: 0;
        }
        .form-group {
          font-size: 16px;
          line-height: 1;
          text-align: left;
        }
        .form-group label {
          cursor: pointer;
          margin-bottom: 5px;
          margin-left: 30px;
        }
        .form-control {
          border-color: rgba(var(--gray2-rgb), .55);
          border-width: 2px;
          color: inherit;
        }
        .form-text {
          font-size: 14px;
        }
        .form-text a {
          color: inherit;
        }
        :global(.enter-btn) {
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .already-subscriptor {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .already-subscriptor a {
          color: inherit;
        }
        .or-enter-with {
          align-items: center;
          display: flex;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .or-enter-with::before,
        .or-enter-with::after {
          border-top: 1px solid rgba(var(--gray2-rgb), .55);
          content: '';
          display: block;
          margin-right: -5px;
          margin-left: -5px;
          flex-grow: 1;
        }
        .or-enter-with::before {
          margin-right: 15px;
        }
        .or-enter-with::after {
          margin-left: 15px;
        }

        /* user */
        .user-select {
          align-items: center;
          display: flex;
          margin-right: 15px;
          position: relative;
        }
        .user-select :global(.dropdown-toggle) {
          align-items: center;
          background-color: transparent !important;
          border: 0;
          box-shadow: none !important;
          display: flex;
          padding: 5px 15px;
        }
        .avatar {
          align-items: center;
          background-color: var(--gray);
          border-radius: 50%;
          display: flex;
          height: 45px;
          justify-content: center;
          margin-right: 10px;
          padding: 5px;
          width: 45px;
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
          background-color: var(--red);
          border-radius: 5px;
          font-family: var(--sans-serif-condensed);
          font-size: 20px;
          font-weight: bold;
          line-height: 1.25;
          margin: 10px 40px 15px;
          padding-right: 25px;
          padding-left: 25px;
          text-align: center;
          transition: background-color .2s;
          width: auto;
        }
        .user-select :global(.dropdown-item-style2):focus,
        .user-select :global(.dropdown-item-style2):hover {
          background-color: var(--dark-red);
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
          border-bottom-color: var(--red);
        }
        .user-select.logged :global(.dropdown-header) {
          background-color: var(--red);
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
