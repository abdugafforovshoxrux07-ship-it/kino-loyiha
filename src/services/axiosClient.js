import axios from 'axios'

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

/**
 * Centralized Axios instance for all TMDB API requests.
 * Every request automatically gets the API key + default query params attached,
 * so individual service functions stay clean and declarative.
 */
const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  config.params = {
    api_key: API_KEY,
    language: 'en-US',
    ...config.params,
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      'Something went wrong while talking to the movie database.'
    return Promise.reject(new Error(message))
  }
)

export default axiosClient
