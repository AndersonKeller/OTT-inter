import { createContext, useState, useEffect } from 'react'

import Router from 'next/router'

import SafeJSONParse from 'json-parse-safe'
import nookies from 'nookies'

import api from '../services/api'
import { setAccessToken, removeAccessToken, getAccessToken } from '../services/auth'

import { CONFIG } from '~/config'
import { isEmpty } from 'lodash'

const UserContext = createContext()

export default UserContext

export function UserProvider({ children }) {

  const { user: userString } = nookies.get({}, 'user')
  const userCookie = SafeJSONParse(userString).value
  const [user, setUser] = useState(userCookie)
  const [shouldAutoLogin] = useState(CONFIG.isAutoLogin && isEmpty(getAccessToken()))

  console.log('access_token:', getAccessToken());
  const signIn = (user, tokenResponse, toComplete = false) => {

    const {
      access_token,
      expires_in,
      refresh_token,
      token_type,
    } = tokenResponse

    setAccessToken(access_token)

    localStorage.setItem('token_type', token_type)
    localStorage.setItem('expires_in', expires_in)
    localStorage.setItem('refresh_token', refresh_token)

    localStorage.setItem('user', JSON.stringify(user))

    nookies.set({}, 'user', JSON.stringify(user), { path: '/' })

    setUser(user)

    if (!user.document) {
      Router.replace('/register/wizard/complete-test')
    } else {
      Router.replace('/')
    }
  }

  const signOut = async _ => {

    api().post('logout').then((response) => {
      console.log('Logout successfully', response)
      removeAccessToken()
      localStorage.removeItem('token_type')
      localStorage.removeItem('expires_in')
      localStorage.removeItem('refresh_token')

    }).catch((error) => {
      console.log("Couldn't logout", error)
    })

    localStorage.removeItem('user')
    nookies.destroy({}, 'user', { path: '/' })
    setUser(null)
    // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  }

  const updateUser = user => {
    const userString = JSON.stringify(user)
    localStorage.setItem('user', userString)
    nookies.set({}, 'user', userString, { path: '/' })
    setUser(user)
  }

  const completeUserProfile = user => {



  }

  return (
    <UserContext.Provider value={{ ...{ user, signIn, signOut, updateUser, shouldAutoLogin } }}>
      {children}
    </UserContext.Provider>
  )
}
