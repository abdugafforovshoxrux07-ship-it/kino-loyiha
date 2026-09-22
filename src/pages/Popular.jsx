import MovieListPage from '../components/MovieListPage.jsx'
import { getPopularMovies } from '../services/movieService.js'

export default function Popular() {
  return (
    <MovieListPage
      title="Popular Movies"
      subtitle="The movies everyone is talking about this week."
      fetcher={getPopularMovies}
    />
  )
}
