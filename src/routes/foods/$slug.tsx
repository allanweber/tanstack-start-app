import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/foods/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/foods/$slug"!</div>
}
