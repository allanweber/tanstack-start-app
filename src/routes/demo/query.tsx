import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=6',
  )

  if (!response.ok) {
    throw new Error('Unable to load todos right now.')
  }

  return response.json()
}

export const Route = createFileRoute('/demo/query')({
  component: QueryDemo,
})

function QueryDemo() {
  const {
    data,
    error,
    isPending,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['demo', 'todos'],
    queryFn: fetchTodos,
    staleTime: 120_000,
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 mb-2">
            TanStack Query
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Client-side data with caching & refetching
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            This page fetches a small todo list with TanStack Query. Toggle the
            network refetch to see cached data revalidate while the UI stays
            responsive.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-200 border border-slate-700">
              Status:{' '}
              {isPending ? 'Loading' : error ? 'Error' : 'Ready and cached'}
            </span>
            {isFetching && (
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-200 border border-cyan-800">
                Revalidating…
              </span>
            )}
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
            >
              Refetch now
            </button>
          </div>

          {isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 rounded-xl bg-slate-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-rose-950 border border-rose-800 text-rose-100">
              {(error as Error).message}
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex items-start gap-3"
                >
                  <div
                    className={`h-3 w-3 rounded-full mt-1 ${
                      todo.completed ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <div>
                    <p className="text-sm text-slate-400">Todo #{todo.id}</p>
                    <p className="text-lg font-semibold">{todo.title}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {todo.completed
                        ? 'Completed (cached)'
                        : 'Open and ready to tackle'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

