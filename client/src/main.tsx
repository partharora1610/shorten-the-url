import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import BaseLayout from "./layouts/BaseLayout.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import NewLink from "./pages/NewLink.tsx"

const router = createBrowserRouter([
  {
    element: (
      <>
        <BaseLayout>
          <Outlet />
        </BaseLayout>
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <App />
          </>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <>
            <Dashboard />
          </>
        ),
      },

      {
        path: "/new",
        element: (
          <>
            <NewLink />
          </>
        ),
      },
    ],
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
