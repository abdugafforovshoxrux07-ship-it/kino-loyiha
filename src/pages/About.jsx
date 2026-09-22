import PageHeader from '../components/PageHeader.jsx'

const TECH_STACK = [
  { name: 'React.js', desc: 'Component-based UI library' },
  { name: 'Vite', desc: 'Lightning-fast dev server & bundler' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'React Router DOM', desc: 'Client-side routing' },
  { name: 'Zustand', desc: 'Lightweight global state' },
  { name: 'Axios', desc: 'Promise-based HTTP client' },
]

export default function About() {
  return (
    <div className="animate-fadeIn pb-16">
      <PageHeader
        title="About CineScope"
        subtitle="A modern movie discovery platform built as a frontend developer portfolio project."
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 pt-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl bg-card-light p-6 shadow-sm dark:bg-card-dark">
          <h2 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">The Project</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            CineScope lets you browse popular, top-rated, now-playing and upcoming movies, explore titles by
            genre, search the full catalog, and save favorites for later — all wrapped in a responsive, animated
            interface that supports both light and dark themes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">Built With</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="rounded-xl bg-card-light p-4 shadow-sm dark:bg-card-dark">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{tech.name}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-card-light p-6 shadow-sm dark:bg-card-dark">
          <h2 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">Data Source</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            All movie data, posters and backdrops are provided by{' '}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary-500 hover:underline"
            >
              The Movie Database (TMDB)
            </a>
            . This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </section>

        <section className="rounded-2xl bg-card-light p-6 shadow-sm dark:bg-card-dark">
          <h2 className="font-display text-lg font-bold text-slate-800 dark:text-slate-100">Author</h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Designed and developed as a portfolio piece to demonstrate modern React development practices:
            component reusability, a clean service layer, global state management, theming, and responsive,
            accessible UI design.
          </p>
        </section>
      </div>
    </div>
  )
}
