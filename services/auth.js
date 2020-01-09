import nookies from 'nookies'

export const ACCESS_TOKEN_KEY = 'access_token'

export const getAccessToken = ctx => {
  const cookies = nookies.get(ctx, ACCESS_TOKEN_KEY)
  return cookies[ACCESS_TOKEN_KEY]
}

export const setAccessToken = accessToken => {
  nookies.set({}, ACCESS_TOKEN_KEY, accessToken, { path: '/' })
}

export const removeAccessToken = _ => {
  nookies.destroy(ctx, ACCESS_TOKEN_KEY, { path: '/' })
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
