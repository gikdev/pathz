import { createRootRoute, Outlet } from "@tanstack/react-router"
import { CanProvider } from "#/features/auth"
import { TanStackQueryProvider } from "#/integrations/tanstack-query"
import { Toaster } from "react-hot-toast"
import { AppStoreProvider } from "#/features/store"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <TanStackQueryProvider>
      <CanProvider role="admin">
        <AppStoreProvider>
          <Toaster position="top-right" />
          <Outlet />
        </AppStoreProvider>
      </CanProvider>
    </TanStackQueryProvider>
  )
}
