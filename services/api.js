import axios from 'axios'
import { getAccessToken } from './auth'

export const baseURL = 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL: `${baseURL}/api`
})

api.interceptors.request.use(async config => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.Accept = 'application/json'
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
