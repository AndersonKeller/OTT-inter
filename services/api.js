import axios from 'axios'
import { getAccessToken } from './auth'
import { API_URL } from '../constants/constants'
import { checkIfItNeedsToLogoutAtBackEnd } from './auth'

export const baseURL = API_URL

const api = axios.create({
  baseURL: `${baseURL}/api`
})

api.interceptors.request.use(async config => {
  const accessToken = getAccessToken()
  config.headers.Accept = 'application/json'
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default api
