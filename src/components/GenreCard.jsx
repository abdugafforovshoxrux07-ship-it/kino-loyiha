import { Link } from 'react-router-dom'

const GRADIENTS = [
  'from-primary-600 to-rose-500',
  'from-indigo-600 to-blue-500',
  'from-emerald-600 to-teal-500',
  'from-amber-600 to-orange-500',
  'from-fuchsia-600 to-purple-500',
  'from-cyan-600 to-sky-500',
  'from-lime-600 to-green-500',
  'from-pink-600 to-rose-400',
]

/**
 * Colorful clickable tile for a movie genre, linking to /genres/:id.
 */
export default function GenreCard({ genre, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]

  return (
    <Link
      to={`/genres/${genre.id}`}
      state={{ name: genre.name }}
      className={`group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} px-4 text-center shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow sm:h-28`}
    >
      <span className="relative z-10 font-display text-base font-bold text-white drop-shadow sm:text-lg">
        {genre.name}
      </span>
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
    </Link>
  )
}
