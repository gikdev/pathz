import { createRootRoute, Outlet } from "@tanstack/react-router"
import { CanProvider } from "#/features/auth"
import { TanStackQueryProvider } from "#/integrations/tanstack-query"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <TanStackQueryProvider>
      <CanProvider role="viewer">
        <Outlet />
      </CanProvider>
    </TanStackQueryProvider>
  )
}
