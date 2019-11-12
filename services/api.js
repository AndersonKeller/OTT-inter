import axios from 'axios'
import { getAccessToken } from './auth'
import { API_URL } from '../constants/constants'

export const baseURL = API_URL

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
