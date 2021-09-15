import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
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
          <App />

          {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        </BrowserRouter>
      </StoreContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
