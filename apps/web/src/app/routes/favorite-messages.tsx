import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/favorite-messages')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/favorite-messages"!</div>
}
