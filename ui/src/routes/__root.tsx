import { QueryClientProvider } from "@tanstack/react-query"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { queryClient } from "../shared/api"
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { CanProvider } from "../shared/auth"

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CanProvider role="USER">
          <Outlet />
          <ReactQueryDevtools />
        </CanProvider>
      </QueryClientProvider>
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}
