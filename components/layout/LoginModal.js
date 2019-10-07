import Color from 'color'
import { useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import ReactSVG from 'react-svg'
import Button from '../button'
import { APP_NAME, STATIC_SUFFIX } from '../../constants/constants'

const FormGroup = (props) => {
  return (
    <div className="form-group">
      {props.children}
      <style jsx>{`
        .form-group {
          font-size: 16px;
          line-height: 1;
          text-align: left;
        }
      `}</style>
    </div>
  )
}

const Label = (props) => {
  return (
    <>
      <label for={props.for}>{props.children}</label>
      <style jsx>{`
        label {
          cursor: pointer;
          margin-bottom: 5px;
          margin-left: 30px;
        }
      `}</style>
    </>
  )
}

const Input = (props) => {
  let inputRef = useRef()
  useEffect(_ => {
    if (props.autofocus)
      inputRef.current.focus();
  })
  return (
    <>
      <input
        autofocus={props.autofocus && "true"}
        className="form-control"
        id={props.id}
        ref={inputRef}
        type={props.type}
      />
      <style jsx>{`
        .form-control {
          border-color: rgba(var(--gray2-rgb), .55);
          border-width: 2px;
          color: inherit;
        }
      `}</style>
    </>
  )
}

const FormText = (props) => {
  return (
    <div className="form-text text-center">
      {props.children}
      <style jsx>{`
        .form-text {
          font-size: 14px;
        }
        .form-text :global(a) {
          color: inherit;
        }
      `}</style>
    </div>
  )
}

export default (props) => {
  const facebookColor = '#3B5990'
  const googleColor = '#D44639'
  return (
    <Modal className="login-modal" onHide={props.handleClose} show={props.show}>
      <Modal.Header>
        <Modal.Title>
          <button className="close" onClick={props.handleClose} type="button">
            <img alt="Cerrar" height="23" src="/static/icons/close.svg" width="23" />
          </button>
          <img alt={APP_NAME} height="64" src={`/static/${STATIC_SUFFIX}/logos/dale.svg`} width="131" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="intro-text">
          <p>Una sola cuenta para todos los productos RIVER PLATE</p>
        </div>
        <form method="post">
          <FormGroup>
            <Label for="email">E-mail</Label>
            <Input autofocus id="email" type="email" />
            <FormText>
              <a href="#">¿Olvidó su nombre de usuario?</a>
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="clave">Clave</Label>
            <Input id="clave" type="password" />
            <FormText>
              <a href="#">¿Olvidó su clave?</a>
            </FormText>
          </FormGroup>
          <Button block className="enter-btn" onClick={props.toogleAuth} size="sm" type="submit">Entrar</Button>
          <div className="already-subscriptor">¿Ya es suscriptor? <a className="bold text-uppercase" href="#" onClick={props.toogleAuth}>Haga Login</a></div>
          <div className="or-enter-with">o entre con</div>
          <Button className="social facebook" onClick={props.toogleAuth} type="button">
            <ReactSVG className="icon" src="/static/icons/facebook.svg" />
            Facebook
          </Button>
          <Button className="social google" onClick={props.toogleAuth} type="button">
            <ReactSVG className="icon" src="/static/icons/google.svg" />
            Google
          </Button>
        </form>
      </Modal.Body>
      <style jsx global>{`
        .modal-backdrop.show {
          opacity: .68;
        }
        .login-modal {
          align-items: center;
          color: var(--gray4);
          padding-top: .5rem;
          padding-bottom: .5rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          .login-modal {
            padding-top: 1.75rem;
            padding-bottom: 1.75rem;
          }
        }
        .modal-open .login-modal {
          display: flex !important;
        }
        .login-modal .modal-dialog {
          box-shadow: 0 2px 6px var(--black);
          margin-top: auto;
          margin-bottom: auto;
          max-width: 325px;
        }
        .login-modal .modal-content {
          border: 0;
          border-radius: 0;
        }
        .login-modal .modal-header {
          background-color: var(--dark-gray3);
          border-radius: 0;
          justify-content: center;
          padding: 10px;
          position: relative;
        }
        .login-modal .close {
          margin: 0;
          opacity: 1;
          outline: 0;
          padding: 15px;
          position: absolute;
          right: 0;
          top: 50%;
          transition: opacity 150ms;
          transform: translateY(-50%);
          will-change: opacity;
        }
        .login-modal .close img {
          display: block;
        }
        .login-modal .close:focus,
        .login-modal .close:hover {
          opacity: .33;
        }
        .login-modal .modal-body {
          padding: 15px 25px 20px;
        }
        .login-modal .intro-text {
          font-size: 18px;
          line-height: 1.2;
          margin-bottom: 5px;
          padding: 0 15%;
        }
        .login-modal .intro-text *:last-child {
          margin-bottom: 0;
        }
        .login-modal .enter-btn {
          margin-top: 30px;
          margin-bottom: 10px;
        }
        .login-modal .already-subscriptor {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .login-modal .already-subscriptor a {
          color: inherit;
        }
        .login-modal .or-enter-with {
          align-items: center;
          display: flex;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .login-modal .or-enter-with::before,
        .login-modal .or-enter-with::after {
          border-top: 2px solid rgba(var(--gray2-rgb), .55);
          content: '';
          display: block;
          margin-right: -5px;
          margin-left: -5px;
          flex-grow: 1;
        }
        .login-modal .or-enter-with::before {
          margin-right: 15px;
        }
        .login-modal .or-enter-with::after {
          margin-left: 15px;
        }
        .login-modal .social {
          font-family: sans-serif;
          font-size: 16px;
          line-height: 22px;
          transition: background-color 150ms;
        }
        .login-modal .social .icon {
          display: inline-block;
          height: 22px;
          margin-top: -2px;
          margin-right: 5px;
          margin-left: -10px;
          vertical-align: middle;
          width: 22px;
        }
        .login-modal .social svg {
          display: block;
        }
        .login-modal .social rect,
        .login-modal .social path {
          transition: fill 150ms;
        }
        .login-modal .facebook {
          background-color: ${facebookColor} !important;
          margin-bottom: 5px;
        }
        .login-modal .facebook .cls-1 {
          fill: ${Color(facebookColor)};
        }
        .login-modal .facebook:focus,
        .login-modal .facebook:hover {
          background-color: ${Color(facebookColor).darken(.2)} !important;
        }
        .login-modal .facebook:focus .cls-1,
        .login-modal .facebook:hover .cls-1 {
          fill: ${Color(facebookColor).darken(.2)};
        }
        .login-modal .google {
          background-color: ${Color(googleColor)} !important;
        }
        .login-modal .google .cls-3 {
          fill: ${Color(googleColor)};
        }
        .login-modal .google:focus,
        .login-modal .google:hover {
          background-color: ${Color(googleColor).darken(.2)} !important;
        }
        .login-modal .google:focus .cls-3,
        .login-modal .google:hover .cls-3 {
          fill: ${Color(googleColor).darken(.2)};
        }
        @media (min-width: 768px) {
          .login-modal .facebook {
            margin-right: 5px;
            margin-bottom: 0;
          }
        }
      `}</style>
    </Modal>
  )
}
