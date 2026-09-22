import MovieListPage from '../components/MovieListPage.jsx'
import { getTopRatedMovies } from '../services/movieService.js'

export default function TopRated() {
  return (
    <MovieListPage
      title="Top Rated"
      subtitle="The highest rated movies of all time, according to TMDB."
      fetcher={getTopRatedMovies}
    />
  )
}
