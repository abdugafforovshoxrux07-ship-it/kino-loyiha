import MovieListPage from '../components/MovieListPage.jsx'
import { getUpcomingMovies } from '../services/movieService.js'

export default function Upcoming() {
  return (
    <MovieListPage
      title="Upcoming"
      subtitle="Get ready — these movies are coming soon."
      fetcher={getUpcomingMovies}
    />
  )
}
