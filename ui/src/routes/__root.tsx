import { createRootRoute, Outlet } from "@tanstack/react-router"
import { CanProvider } from "#/features/auth"
import { TanStackQueryProvider } from "#/integrations/tanstack-query"
import { Toaster } from "react-hot-toast"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <TanStackQueryProvider>
      <CanProvider role="admin">
        <Toaster position="top-right" />
        <Outlet />
      </CanProvider>
    </TanStackQueryProvider>
  )
}
