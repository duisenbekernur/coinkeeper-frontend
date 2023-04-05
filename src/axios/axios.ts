import axios from 'axios'
import { getAccessToken } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { errorCatch } from './axios.helper'

// 'https://coinkeeper-backend.onrender.com/api/'

const axiosOptions = {
  baseURL: 'http://localhost:3210/api/',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const axiosInstance = axios.create(axiosOptions)

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (
      (error?.response?.status == 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        await AuthService.getNewTokens()
        return axiosInstance.request(originalRequest)
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') removeFromStorage()
      }
    }

    throw error
  }
)
