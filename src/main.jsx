import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { QueryParamProvider } from 'use-query-params'
import StoreContextProvider from './contexts/StoreContextProvider'

// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, //5min
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StoreContextProvider>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
            <App />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryParamProvider>
        </BrowserRouter>
      </StoreContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
