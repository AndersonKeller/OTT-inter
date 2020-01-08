import { createContext, useState, useEffect } from 'react'

import Router from 'next/router'

import SafeJSONParse from 'json-parse-safe'
import nookies from 'nookies'

import api from '../services/api'
import { setAccessToken, removeAccessToken } from '../services/auth'

const UserContext = createContext()

export default UserContext

export function UserProvider({ children }) {

  const [user, setUser] = useState(null)

  const signIn = (user, tokenResponse) => {

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

    if ( ! user.register_completed_at) {
      Router.replace('/register/complete')
    }
  }

  const signOut = async _ => {

    api.post('logout').then((response) => {
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

  const updateUserData = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    nookies.set({}, 'user', JSON.stringify(user), { path: '/' })
    setUser(user)
  }

  useEffect( _ => {
    const getUser = async _ => {
      const { user: userString } = nookies.get({}, 'user')
      const user = SafeJSONParse(userString).value
      if (user) {
        setUser(user)
      } else {
        // Router.push('/')
      }
    }
    getUser()
  }, [])

  return (
    <UserContext.Provider value={{...{ user, signIn, signOut, updateUserData }}}>
      {children}
    </UserContext.Provider>
  )
}
