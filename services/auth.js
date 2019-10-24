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

// export const isAuthenticated = _ => getAccessToken() !== null

/* export const login = accessToken => {
  setAccessToken(accessToken)
} */

/* export const logout = () => {
  removeAccessToken()
} */
