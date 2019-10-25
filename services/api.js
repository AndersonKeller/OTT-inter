import axios from 'axios'
import { getAccessToken } from './auth'
import { IS_PRODUCTION } from '../constants/constants'

export const baseURL = IS_PRODUCTION ? 'http://dale.sa-east-1.elasticbeanstalk.com' : 'http://127.0.0.1:8000'

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
