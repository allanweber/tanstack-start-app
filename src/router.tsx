import { Link, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFound,
  })

  return router
}

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center text-slate-200">
      <p className="text-2xl font-semibold">Page not found</p>
      <p className="text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-cyan-500 px-4 py-2 text-white transition-colors hover:bg-cyan-600"
      >
        Back to home
      </Link>
    </div>
  )
}
