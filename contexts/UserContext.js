import { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { setAccessToken, removeAccessToken } from '../services/auth'

const UserContext = createContext()

export default UserContext

export function UserProvider({ children }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async _ => {
      const userString = localStorage.getItem('user')
      if (userString) {
        const user = JSON.parse(userString)
        setUser(user)
      } else {
        // Router.push('/')
      }
    }
    getUser()
  }, [])

  const signIn = (user, tokenResponse) => {

    const { token_type, expires_in, access_token, refresh_token } = tokenResponse

    setAccessToken(access_token)

    localStorage.setItem('token_type', token_type)
    localStorage.setItem('expires_in', expires_in)
    localStorage.setItem('refresh_token', refresh_token)
    localStorage.setItem('user', JSON.stringify(user))

    setUser(user)
    // Router.push('/', '#logged')
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
    setUser(null)
    // Router.push('/signin')
    // location.href = location.protocol + '//' + location.host + location.pathname
  }

  return (
    <UserContext.Provider value={{...{ user, signIn, signOut }}}>
      {children}
    </UserContext.Provider>
  )
}
