import axios from 'axios'
import { getAccessToken } from './auth'
import { API_URL } from '../constants/constants'
import { checkIfItNeedsToLogoutAtBackEnd } from './auth'

export const baseURL = API_URL

let http

const api = ctx => {
  if ( ! http) {
    http = axios.create({
      baseURL: `${baseURL}/api`
    })
    http.interceptors.request.use(async config => {
      const accessToken = getAccessToken(ctx)
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
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    })
  }
  return http
}

export default api
