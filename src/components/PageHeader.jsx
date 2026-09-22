export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-2xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-3xl">
        {title}
      </h1>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </div>
  )
}
