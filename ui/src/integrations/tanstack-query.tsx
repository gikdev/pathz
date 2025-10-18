import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { PropsWithChildren } from "react"

export const queryClient = new QueryClient()

export const TanStackQueryProvider = (p: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {p.children}
    <ReactQueryDevtools />
  </QueryClientProvider>
)
