import MovieListPage from '../components/MovieListPage.jsx'
import { getNowPlayingMovies } from '../services/movieService.js'

export default function NowPlaying() {
  return (
    <MovieListPage
      title="Now Playing"
      subtitle="Currently showing in theaters."
      fetcher={getNowPlayingMovies}
    />
  )
}
