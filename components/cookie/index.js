import { createContext, useState, useContext, useEffect } from 'react'
import apiService from '~/services/api'
import CookieConsent, { Cookies } from "react-cookie-consent";
import UserContext from '~/contexts/UserContext'

const Cookie = () => {
  const { user } = useContext(UserContext)
  const [show, setShow] = useState(user ? user.has_cookie_consent : null)

  useEffect(_ => {
    setShow(user ? user.has_cookie_consent : null)
  }, [user])



  async function changeCookies(value) {
    if (user) {
      let data = { id: user.id, status: value }
      let res = await apiService().post(`change-cookie`, data)
    }
  }
  return (
    <>

      {(show == null || show == "NI") ? (
        <>
          <CookieConsent
            enableDeclineButton="true"
            location="bottom"
            declineButtonText="Recusar"
            buttonText="Aceitar"
            cookieName="myAwesomeCookieName2"
            style={{ background: "rgb(244 249 251 / 38%)", fontSize: "13px" }}
            declineButtonStyle={{ color: "white", fontSize: "13px" }}
            buttonStyle={{ background: "rgb(34 122 196)", color: "white", fontSize: "13px" }}
            expires={150}
            onAccept={() => {
              changeCookies("s")
            }}
            onDecline={() => {
              changeCookies("N")
            }}
          >
            Este sitio almacena datos como cookies
          </CookieConsent>
        </>
      ) : ''}
    </>
  )

}
export default Cookie;
