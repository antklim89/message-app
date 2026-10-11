import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile/$userId/followings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile/$userId/followings"!</div>
}
