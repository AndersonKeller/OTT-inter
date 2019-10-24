import Color from 'color'
import { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import ReactSVG from 'react-svg'
import Button from '../button'
import { STATIC_PATH, CLIENT_SECRET, CLIENT_ID } from '../../constants/constants'
import { CONFIG } from '../../config'
import { Tab } from 'react-bootstrap'
import { api, baseURL } from '../../services/api'
import { setAccessToken } from '../../services/auth'
import UserContext from '../UserContext'

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

const Label = ({ children, htmlFor, ...props }) => {
  return (
    <>
      <label htmlFor={htmlFor}>{children}</label>
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

const Input = ({ autoFocus, id, onChange, required, type, value }) => {
  const inputRef = useRef()
  useEffect(_ => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  })
  return (
    <>
      <input
        autoFocus={autoFocus && "true"}
        className="form-control"
        id={id}
        onChange={onChange}
        ref={inputRef}
        required={required}
        type={type}
        value={value}
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

const LoginTab = ({setTab, toggleAuth}) => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { signIn } = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault();
    const tokenResponse = await api.post(`${baseURL}/oauth/token`, {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: email,
      password: password,
      scope: '',
    })
    const { access_token } = tokenResponse.data
    setAccessToken(access_token)
    const userResponse = await api.get('/user')
    signIn(userResponse.data, tokenResponse.data)
  }
  return (
    <div>
      <div className="intro-text">
        <p>Una sola cuenta para todos los productos <span className="text-uppercase">{CONFIG.clubName}</span></p>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <FormGroup>
          <Label hmtlFor="email">E-mail</Label>
          <Input autoFocus id="email" onChange={e => setEmail(e.target.value)} required type="email" value={email} />
        </FormGroup>
        <FormGroup>
          <Label hmtlFor="clave">Clave</Label>
          <Input id="clave" onChange={e => setPassword(e.target.value)} required type="password" value={password} />
          <FormText>
            <a href="#" onClick={_ => setTab('password')}>¿Olvidó su clave?</a>
          </FormText>
        </FormGroup>
        <Button block className="enter-btn" size="sm" type="submit">Entrar</Button>
        <div className="already-subscriptor">
          ¿No es suscriptor? <a className="bold text-uppercase" href="#" onClick={_ => setTab('register')}>Regístrate!</a>
        </div>
        <div className="or-enter-with">o entre con</div>
        <Button className="social facebook" onClick={toggleAuth} type="button">
          <ReactSVG className="icon" src="/static/icons/facebook.svg" />
          Facebook
        </Button>
        <Button className="social google" onClick={toggleAuth} type="button">
          <ReactSVG className="icon" src="/static/icons/google.svg" />
          Google
        </Button>
      </form>
    </div>
  )
}

export default ({ handleClose, show, toggleAuth, ...props}) => {
  const facebookColor = '#3B5990'
  const googleColor = '#D44639'
  const [ tab, setTab ] = useState('login')

  return (
    <Modal className="login-modal" onHide={handleClose} show={show}>
      <Modal.Header>
        <Modal.Title>
          { tab === 'password' || tab === 'register' ? (
            <button className="back" onClick={_ => setTab('login')} type="button">
              <img alt="Volver" height="23" src="/static/icons/back.svg" width="23" />
            </button>
          ) : (
            <button className="close" onClick={handleClose} type="button">
              <img alt="Cerrar" height="23" src="/static/icons/close.svg" width="23" />
            </button>
          )}
          <img alt={CONFIG.appName} height="64" src={`${STATIC_PATH}/logos/dale.svg`} width="131" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={tab} id="user-modal-tabs" onSelect={k => setTab(k)}>
          <Tab.Content>

            {/* login */}
            <Tab.Pane eventKey="login">
              <LoginTab setTab={setTab} toggleAuth={toggleAuth} />
            </Tab.Pane>

            {/* password recovery */}
            <Tab.Pane eventKey="password">
              <div className="intro-text" style={{ marginBottom: 15 }}>
                <p>¿Olvidó su clave?</p>
              </div>
              <form method="post">
                <FormGroup>
                  <Label hmtlFor="email2">E-mail</Label>
                  <Input autoFocus id="email2" type="email" />
                </FormGroup>
                <Button block className="enter-btn" onClick={e => { e.preventDefault(); alert('pã');}} size="sm" type="submit">
                  Enviar Recuperación
                </Button>
              </form>
            </Tab.Pane>

            {/* register */}
            <Tab.Pane eventKey="register">
              <div className="intro-text">
                <p>Una sola cuenta para todos los productos <span className="text-uppercase">{CONFIG.clubName}</span></p>
              </div>
              <form method="post">
                <FormGroup>
                  <Label hmtlFor="name">Nombre</Label>
                  <Input autoFocus id="name" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="lastname">Apellido</Label>
                  <Input id="lastname" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="email">E-mail</Label>
                  <Input id="email" type="email" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="password">Clave</Label>
                  <Input id="password" type="password" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="password_confirmation">Confirmación de Clave</Label>
                  <Input id="password_confirmation" type="password" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="address">Dirección</Label>
                  <Input id="address" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="city">Ciudad</Label>
                  <Input id="city" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="country">País</Label>
                  <Input id="country" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="document">Documento</Label>
                  <Input id="document" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="genre">Género</Label>
                  <Input id="genre" type="text" />
                </FormGroup>
                <FormGroup>
                  <Label hmtlFor="payment">Meios de Pagamento</Label>
                  <Input id="payment" type="text" />
                </FormGroup>
                <Button block className="enter-btn" onClick={toggleAuth} size="sm" type="submit">Registrar</Button>
                <div className="already-subscriptor">
                  ¿Ya es suscriptor? <a className="bold text-uppercase" href="#" onClick={_ => setTab('login')}>Haga Login</a>
                </div>
                <div className="or-enter-with">o entre con</div>
                <Button className="social facebook" onClick={toggleAuth} type="button">
                  <ReactSVG className="icon" src="/static/icons/facebook.svg" />
                  Facebook
                </Button>
                <Button className="social google" onClick={toggleAuth} type="button">
                  <ReactSVG className="icon" src="/static/icons/google.svg" />
                  Google
                </Button>
              </form>
            </Tab.Pane>

          </Tab.Content>
        </Tab.Container>
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
        @media (min-width: 768px) {
          .login-modal .modal-dialog {
            min-width: 325px;
          }
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
        .login-modal .back,
        .login-modal .close {
          background-color: transparent;
          border: 0;
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
        .login-modal .back img,
        .login-modal .close img {
          display: block;
        }
        .login-modal .back:focus,
        .login-modal .back:hover,
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
