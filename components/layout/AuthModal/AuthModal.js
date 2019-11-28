import Color from 'color'
import Router from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Tab, Form, Spinner } from 'react-bootstrap'
// import ReactSVG from 'react-svg'

import { CONFIG } from '../../../config'
import { WHITE } from '../../../constants/colors'
import { STATIC_PATH, CLIENT_SECRET, CLIENT_ID } from '../../../constants/constants'
import { AuthModalContext } from '../../../contexts/AuthModalContext'
import api, { baseURL } from '../../../services/api'
import { setAccessToken } from '../../../services/auth'

import Button from '../../button'
import Loading from '../../Loading/Loading'
import UserContext from '../../UserContext'

import FormGroup from './FormGroup'
import LoginTab from './LoginTab'
import Input from './Input'

export default function AuthModal() {
  const { backTab, changeTab, closeAuthModal, show, tab, tabsHistory } = useContext(AuthModalContext)
  const facebookColor = '#3B5990'
  const googleColor = '#D44639'
  const [ loading, setLoading ] = useState()

  function back(e) {
    e.preventDefault()
    backTab()
  }

  function close(e) {
    e.preventDefault()
    closeAuthModal()
  }

  function onHide() {
    closeAuthModal()
  }

  function onSelect(e) {
    return changeTab(e)
  }

  return (
    <Modal backdrop={loading ? 'static' : true} className="login-modal" {...{onHide, show}}>
      <Modal.Header>
        <Modal.Title>
          { tabsHistory.length > 1 ? (
            <button className="back" disabled={loading} onClick={back} type="button">
              <img alt="Volver" height="23" src="/static/icons/back.svg" width="23" />
            </button>
          ) : (
            <button className="close" disabled={loading} onClick={close} type="button">
              <img alt="Cerrar" height="23" src="/static/icons/close.svg" width="23" />
            </button>
          )}
          <img alt={CONFIG.appName} height="64" src={`${STATIC_PATH}/logos/dale.svg`} width="131" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { loading && (
          <ModalLoading />
        )}
        <Tab.Container activeKey={tab} id="user-modal-tabs" {...{onSelect}}>
          <Tab.Content>

            {/* login */}
            <Tab.Pane eventKey="login">
              <LoginTab {...{changeTab, setLoading}} />
            </Tab.Pane>

            {/* password recovery */}
            <Tab.Pane eventKey="password">
              <PasswordTab />
            </Tab.Pane>

            {/* register */}
            <Tab.Pane eventKey="register">
              <RegisterTab {...{handleClose: closeAuthModal, changeTab}} />
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
        .login-modal .back[disabled],
        .login-modal .close[disabled] {
          cursor: not-allowed;
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

const ModalLoading = _ => (
  <div className="modal-loading">
    <Loading />
    <style jsx>{`
      .modal-loading {
        background-color: ${Color(WHITE).fade(.2)};
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        left: 0;
        padding-bottom: 10%;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `}</style>
  </div>
)

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

const RegisterTab = ({handleClose, changeTab})  => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useContext(UserContext)

  const handleSubmit = async e  => {
    e.preventDefault();
    try {
      const tokenResponse = await api.post('/register', {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        name,
        email,
        password,
      })
      const { access_token, } = tokenResponse.data
      setAccessToken(access_token)
      const userResponse = await api.get('/user')
      signIn(userResponse.data, tokenResponse.data)
      handleClose()
      Router.push('/register/confirm')
    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError('An error has occurred!')
        console.log('error', error)
      }
    }
  }

  function goToLogin(e) {
    e.preventDefault()
    changeTab('login')
  }

  return (
  <>
    <div className="intro-text">
      <p>Una sola cuenta para todos los productos <span className="text-uppercase">{CONFIG.clubName}</span></p>
    </div>
    <form method="post" onSubmit={handleSubmit}>

      {error && <div className="invalid-feedback">{error.message}</div>}

      <FormGroup>
        {/* <Label hmtlFor="name">Nombre</Label> */}
        <Input id="name" type="text" placeholder="Nombre" onChange={e => setName(e.target.value)} value={name} />
        {error && error.errors && (<div className="invalid-feedback">{error.errors.name}</div>)}
      </FormGroup>

      <FormGroup>
        {/* <Label hmtlFor="reg_email">E-mail</Label> */}
        <Input id="reg_email" type="email" placeholder="E-mail" onChange={e => setEmail(e.target.value)} value={email} />
        {error && error.errors && (<div className="invalid-feedback">{error.errors.email}</div>)}
      </FormGroup>

      <FormGroup>
        {/* <Label hmtlFor="reg_password">Clave</Label> */}
        <Input id="reg_password" type="password" placeholder="Clave"  onChange={e => setPassword(e.target.value)} value={password} />
        {error && error.errors &&  (
          <div className="invalid-feedback">{error.errors.password}</div>
        )}
      </FormGroup>

      {/* <FormGroup>
        <Label hmtlFor="password_confirmation">Confirmación de Clave</Label>
        <Input id="password_confirmation" type="password" />
      </FormGroup> */}

      <Button block className="enter-btn" size="sm" type="submit">Registrar</Button>
      <div className="already-subscriptor">
        <span>¿Ya es suscriptor?</span>
        &nbsp;
        <a className="bold text-uppercase" href="#" onClick={goToLogin}>Haga Login</a>
      </div>
      {/* <div className="or-enter-with">o entre con</div>
      <Button className="social facebook" onClick={toggleAuth} type="button">
        <ReactSVG className="icon" src="/static/icons/facebook.svg" />
        Facebook
      </Button>
      <Button className="social google" onClick={toggleAuth} type="button">
        <ReactSVG className="icon" src="/static/icons/google.svg" />
        Google
      </Button> */}
    </form>

    {/* <style jsx>{`
    .label-radio {
      padding-right: 5px;
    }
  `}</style> */}
  </>
  )
}

const PasswordTab = ({handleClose, setTab}) => {

  const [email,setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try{
      let { data } = await api.post('/forgot', {
        email
      })
      console.table(data)
      setEmailSent(true)
      setMessage(data.message)
      setLoading(false)
    }catch(error){
      console.table(error)
      if (error.response) {
        const { data, status } = error.response
        if(data) setError(data)
      } else {
        setError({message: 'An error has occurred!'})
        console.log('error', error)
      }
      setLoading(false)
    }
  }

  return (
    <>
      {emailSent ?
        <p>
          {message}
          {/* Acceda al correo electrónico registrado para para recuperar tu clave. */}
        </p>
      :
        <div>
          <div className="intro-text" style={{ marginBottom: 15 }}>
            <p>¿Olvidó su clave?</p>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <FormGroup>
              <Input id="email_recover" placeholder="E-mail" autoFocus onChange={e => setEmail(e.target.value)} value={email}  type="email" />
              {error && <div className="invalid-feedback">{error.message}</div>}
            </FormGroup>
            <Button block className="enter-btn" size="sm" type="submit">
              {/* {isLoading ? 'Loading…' : 'Enviar Recuperación'} */}
              {isLoading && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              {'  Enviar Recuperación'}
            </Button>
          </form>
        </div>
      }
    </>
  )
}
