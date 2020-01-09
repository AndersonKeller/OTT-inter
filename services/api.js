import axios from 'axios'
import { getAccessToken, checkIfItNeedsToLogout, checkIfItNeedsToLogoutAtBackEnd } from './auth'
import { API_URL } from '../constants/constants'

export const baseURL = API_URL

let http, apiCtx, apiSignOut

const api = (ctx, signOut) => {

  if ( ! http) {
    http = axios.create({
      baseURL: `${baseURL}/api`
    })
    http.interceptors.request.use(async config => {
      const accessToken = getAccessToken(apiCtx)
      config.headers.Accept = 'application/json'
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    })
    http.interceptors.response.use(response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    }, function (error) {
      if (apiCtx) {
        checkIfItNeedsToLogoutAtBackEnd(error, apiCtx)
      } else {
        checkIfItNeedsToLogout(error, apiSignOut)
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    })
  }

  apiCtx = ctx
  apiSignOut = signOut

  return http
}

export default api
