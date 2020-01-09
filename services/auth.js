import nookies from 'nookies'

export const ACCESS_TOKEN_KEY = 'access_token'

export const getAccessToken = _ => {
  if (typeof window === 'undefined') {
    return null
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const setAccessToken = accessToken => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

export const removeAccessToken = _ => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const checkIfItNeedsToLogout = (error, signOut) => {
  if (error.response && error.response.status === 401) {
    signOut()
  }
}

export const checkIfItNeedsToLogoutAtBackEnd = (error, ctx) => {
  if (error.response && error.response.status === 401) {
    nookies.destroy(ctx, 'user', { path: '/' })
  }
}

// export const isAuthenticated = _ => getAccessToken() !== null

/* export const login = accessToken => {
  setAccessToken(accessToken)
} */

/* export const logout = () => {
  removeAccessToken()
} */
