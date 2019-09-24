import Link from 'next/link'
import { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Chevron from '../icons/chevron'
import UserContext from '../UserContext'

export default _ => {
  const { signIn, signOut, user } = useContext(UserContext)
  const toogleAuth = (e) => {
    e.preventDefault()
    if (user) {
      signOut()
    } else {
      signIn('test_user')
    }
  }
  return (
    <div className="user-select d-none d-md-flex">
      <Dropdown alignRight>
        <Dropdown.Toggle id={`dropdown-custom-user`}>
          <span className="avatar">
            <img alt="Avatar" height="31" src="/static/avatar-icon.svg" width="24" />
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
        <Dropdown.Menu>
          { user ? (
            <>
              <div>
                Pablo Capriorni<br />
                pablocapriorni@gmail.com<br />
                Suscriptor
              </div>
              <Dropdown.Divider />
              <Dropdown.Item href="">Mi Lista</Dropdown.Item>
              <Dropdown.Item href="">Mi Cuenta</Dropdown.Item>
              <Dropdown.Item href="">Configuración</Dropdown.Item>
              <Dropdown.Item href="">Ayuda</Dropdown.Item>
              <Dropdown.Item href="">Soporte</Dropdown.Item>
              <Dropdown.Item onClick={(e) => toogleAuth(e)}>Salir</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item as="button" className="dropdown-item-style1" onClick={(e) => toogleAuth(e)}>Entrar</Dropdown.Item>
              <Link href="/subscriptor">
                <Dropdown.Item className="dropdown-item-style2" href="/subscriptor">Suscripción</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item href="">Ajustes</Dropdown.Item>
              <Dropdown.Item href="">Ayuda</Dropdown.Item>
            </>
          ) }
        </Dropdown.Menu>
      </Dropdown>
      <style jsx>{`
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
          overflow: hidden;
          padding-top: 5px;
          padding-bottom: 5px;
          text-align: center;
        }
        .user-select :global(.dropdown-menu)::before {
          border: 13px solid transparent;
          border-top: 0;
          border-bottom-color: var(--gray2);
          content: '';
          display: block;
          position: absolute;
          right: 10px;
          top: -10px;
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
      `}</style>
    </div>
  )
}
