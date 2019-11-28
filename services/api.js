import axios from 'axios'
import { getAccessToken } from './auth'
import { API_URL } from '../constants/constants'

export const baseURL = API_URL

const api = axios.create({
  baseURL: `${baseURL}/api`
})

api.interceptors.request.use(async config => {
  config.headers.Accept = 'application/json'
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export default api
