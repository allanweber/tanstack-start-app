import { Outlet, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/header'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="relative">
      <Header />
      <Outlet />
    </div>
  )
}
