import Color from 'color'
import nookies from 'nookies'
import { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Tab } from 'react-bootstrap'
import { ThemeContext } from 'styled-components'
import AppLogo from '~/components/AppLogo'
import { TENANT } from '~/constants/constants'
import { AuthModalContext } from '~/contexts/AuthModalContext'
import api from '~/services/api'
import LoginTab from './LoginTab'
import ModalLoading from './ModalLoading'
import PasswordTab from './PasswordTab'
import RegisterTab from './RegisterTab'

export default function AuthModal() {
  const { backTab, changeTab, closeAuthModal, show, tab, tabsHistory, packageId } = useContext(AuthModalContext)
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

  const socialLogin = async e => {
    let provider = e.currentTarget.innerText;
    try {
      nookies.set({}, 'pkg_int_id', JSON.stringify(packageId), { path: '/' })
      const res = await api().get(`auth/${provider}`)
      // console.table(res)
      // console.log(res.data.url)
      window.location = res.data.url

    } catch (error) {
      console.table(error)
      // setError('An error has occurred!')
    }
    // console.table(e.currentTarget.innerText);
  }
  const theme = useContext(ThemeContext)
  const headerColor = theme.colors.backgroundContrast

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
          <AppLogo height={TENANT === 'lau' ? 45 : 30} verticalAlign="middle" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { loading && (
          <ModalLoading />
        )}
        <Tab.Container activeKey={tab} id="user-modal-tabs" {...{onSelect}}>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <LoginTab {...{changeTab, setLoading, socialLogin }} />
            </Tab.Pane>
            <Tab.Pane eventKey="password">
              <PasswordTab {...{setLoading}} />
            </Tab.Pane>
            <Tab.Pane eventKey="register">
              <RegisterTab {...{changeTab, setLoading, socialLogin }} />
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
          justify-content: center;
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
          background-color: ${headerColor};
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
          margin-bottom: 15px;
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
          margin-bottom: 5px;
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
        @media (max-width: 768px) {
          .login-modal .facebook,
          .login-modal .google {
            padding: 8px 15px;
          }
        }
      `}</style>
    </Modal>
  )
}
