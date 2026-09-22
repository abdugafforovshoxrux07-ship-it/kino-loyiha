import axiosClient from './axiosClient.js'

/**
 * All movie-related API calls live here, in one service layer.
 * UI components never call Axios directly — they call these functions instead.
 */

// ----- Movie lists -----

export const getPopularMovies = (page = 1) =>
  axiosClient.get('/movie/popular', { params: { page } })

export const getTopRatedMovies = (page = 1) =>
  axiosClient.get('/movie/top_rated', { params: { page } })

export const getNowPlayingMovies = (page = 1) =>
  axiosClient.get('/movie/now_playing', { params: { page } })

export const getUpcomingMovies = (page = 1) =>
  axiosClient.get('/movie/upcoming', { params: { page } })

export const getTrendingMovies = (timeWindow = 'week') =>
  axiosClient.get(`/trending/movie/${timeWindow}`)

// ----- Movie details -----

export const getMovieDetails = (movieId) =>
  axiosClient.get(`/movie/${movieId}`, {
    params: { append_to_response: 'credits,videos' },
  })

export const getSimilarMovies = (movieId, page = 1) =>
  axiosClient.get(`/movie/${movieId}/similar`, { params: { page } })

// ----- Search -----

export const searchMovies = (query, page = 1) =>
  axiosClient.get('/search/movie', { params: { query, page, include_adult: false } })

// ----- Genres -----

export const getGenres = () => axiosClient.get('/genre/movie/list')

export const getMoviesByGenre = (genreId, page = 1) =>
  axiosClient.get('/discover/movie', {
    params: { with_genres: genreId, page, sort_by: 'popularity.desc' },
  })

export default {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getMovieDetails,
  getSimilarMovies,
  searchMovies,
  getGenres,
  getMoviesByGenre,
}
